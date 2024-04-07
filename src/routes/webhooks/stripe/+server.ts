import {
	STRIPE_SECRETE_KEY,
	STRIPE_WEBHOOK_SECRET,
	RESEND_API_KEY,
	SENDER_EMAIL
} from '$env/static/private';
import Stripe from 'stripe';
import { db } from '../../../hooks.server.js';
import { text } from '@sveltejs/kit';
import { Resend } from 'resend';

const stripe = new Stripe(STRIPE_SECRETE_KEY);
const resend = new Resend(RESEND_API_KEY);
export async function POST({ request }) {
	const req = await request.text();
	const event = await stripe.webhooks.constructEvent(
		req,
		request.headers.get('stripe-signature') as string,
		STRIPE_WEBHOOK_SECRET
	);

	if (event.type === 'charge.succeeded') {
		const charge = event.data.object;
		const productId = charge.metadata.productId;
		const email = charge.billing_details.email;
		const username = charge.billing_details.name as string;
		const pricePaidInCents = charge.amount;

		const product = await db.product.findUnique({ where: { id: productId } });
		if (product === null || email === null) {
			console.log('did you run');
			return text('Bad request', { status: 400 });
		}
		const userFields = {
			email,
			Order: {
				create: {
					productId,
					pricePaidInCents
				}
			}
		};

		const {
			Order: [order]
		} = await db.user.upsert({
			where: { email },
			create: {
				...userFields,
				username,
				hashPassword: 'your_password'
			},
			update: userFields,
			select: { Order: { orderBy: { createdAt: 'desc' }, take: 1 } }
		});

		const downloadVerification = await db.downloadVerification.create({
			data: {
				productId,
				expiredAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
			}
		});

		const sentEmail = await resend.emails.send({
			from: `support <${SENDER_EMAIL}>`,
			to: email,
			subject: 'Order Confirmation',
			html: '<strong>this is to confirm your order</strong>'
		});
	}
	// return json();
	return new Response();
}
