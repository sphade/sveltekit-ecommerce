import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { db } from '../../../hooks.server.js';
import { Resend } from 'resend';
import { RESEND_API_KEY, SENDER_EMAIL } from '$env/static/private';

const schema = z.object({
	email: z.string().email()
});
const resend = new Resend(RESEND_API_KEY);
export const load = async () => {
	return {
		form: await superValidate(zod(schema))
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = await db.user.findUnique({
			where: { email: form.data.email },
			select: {
				email: true,
				Order: {
					select: {
						pricePaidInCents: true,
						id: true,
						createdAt: true,
						product: {
							select: {
								id: true,
								name: true,
								imagePath: true,
								description: true
							}
						}
					}
				}
			}
		});

		if (user === null) {
			return message(
				form,
				'check your email to view your order history and download your products'
			);
		}

		const orders = user?.Order.map(async (order) => {
			return {
				...order,
				downloadVerificationId: (
					await db.downloadVerification.create({
						data: {
							expiredAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
							productId: order.product.id
						}
					})
				).id
			};
		});

		const sentEmail = await resend.emails.send({
			from: `support <${SENDER_EMAIL}>`,
			to: user.email,
			subject: 'Order History',
			html: '<strong>this are your orders</strong>'
		});

		return message(form, 'check your email to view your order history and download your products');
	}
};
