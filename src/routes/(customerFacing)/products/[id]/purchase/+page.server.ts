import { error } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server';
import Stripe from 'stripe';
import { STRIPE_SECRETE_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRETE_KEY);

export const load = async ({ params: { id } }) => {
	const product = await db.product.findUnique({
		where: {
			id
		}
	});

	if (!product) error(404, 'not found');
	const paymentIntent = await stripe.paymentIntents.create({
		amount: product.priceInCents,
		currency: 'USD',
		metadata: { productId: product.id },
		automatic_payment_methods: {
			enabled: true
		}
	});
	if (paymentIntent.client_secret === null) {
		throw Error('failed to create payment intent');
	}

	return {
		product,
		clientSecret: paymentIntent.client_secret
	};
};
