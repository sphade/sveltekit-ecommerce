import { db } from '../../../hooks.server';

export const load = async () => {
	return {
		orders: await db.order.findMany({
			select: {
				id: true,
				pricePaidInCents: true,
				product: { select: { name: true } },
				user: { select: { email: true } }
			},
			orderBy: { createdAt: 'desc' }
		})
	};
};
export const actions = {
	deleteOrder: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		await db.order.delete({ where: { id } });
	}
};
