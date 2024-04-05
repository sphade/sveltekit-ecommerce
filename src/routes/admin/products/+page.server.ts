import { db } from '../../../hooks.server';
import type { PageServerLoad } from './$types';
import fs from 'fs/promises';

export const load = (async () => {
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
}) satisfies PageServerLoad;

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
		const product = await db.product.delete({ where: { id } });

		await fs.unlink(product.filePath);
		await fs.unlink(`static${product.imagePath}`);
	}
};
