import { STRIPE_SECRETE_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';
import Stripe from 'stripe';
import { db } from '../../../../hooks.server.js';

const stripe = new Stripe(STRIPE_SECRETE_KEY);

async function createDownloadVerification(productId: string) {
	// date is the number of millisecond in one day
	return (
		await db.downloadVerification.create({
			data: { productId, expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000) }
		})
	).id;
}

export const load = async ({ url: { searchParams } }) => {
	const payment_intent = searchParams.get('payment_intent') as string;
	const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
	const productId = paymentIntent.metadata.productId;
	if (productId === null) error(404, 'not found');
	const product = await db.product.findUnique({ where: { id: productId } });
	if (product === null) error(404, 'not found');
	const isSuccess = paymentIntent.status === 'succeeded';

	return {
		product,
		isSuccess,
		downloadVerification: await createDownloadVerification(product.id)
	};
};
