import { db } from '../../../hooks.server';
import fs from 'fs/promises';

export const load = async () => {
	return {
		products: await db.product.findMany({
			select: {
				id: true,

				name: true,
				priceInCents: true,
				isAvailableForPurchase: true,
				imagePath: true,

				_count: {
					select: { Order: true }
				}
			},
			orderBy: { name: 'asc' }
		})
	};
};

export const actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const isAvailableForPurchase = formData.has('isAvailableForPurchase');
		await db.product.update({
			where: { id },
			data: {
				isAvailableForPurchase
			}
		});
	},
	deleteProduct: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const product = await db.product.findUnique({
			where: { id },
			select: { _count: { select: { Order: true } } }
		});

		if (product && product._count.Order > 0) return;
		const deletedProduct = await db.product.delete({ where: { id } });

		await fs.unlink(deletedProduct.filePath);
		await fs.unlink(`static${deletedProduct.imagePath}`);
	}
};
