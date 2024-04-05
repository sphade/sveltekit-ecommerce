import { db } from '../../hooks.server';

function getMostPopularProducts() {
	return db.product.findMany({
		orderBy: { Order: { _count: 'desc' } },
		where: { isAvailableForPurchase: true },
		take: 6
	});
}
function getNewestProducts() {
	return db.product.findMany({
		orderBy: { createdAt: 'desc' },
		where: { isAvailableForPurchase: true },
		take: 6
	});
}

export const load = async () => {
	const [mostPopularProducts, newestProducts] = await Promise.all([
		getMostPopularProducts(),
		getNewestProducts()
	]);
	return {
		mostPopularProducts,
		newestProducts
	};
};
