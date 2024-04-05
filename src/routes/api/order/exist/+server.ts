import { json } from '@sveltejs/kit';
import { db } from '../../../../hooks.server.js';

export async function POST({ request }) {
	const { email, productId } = await request.json();

	const orderExists =
		(await db.order.findFirst({ where: { user: { email }, productId }, select: { id: true } })) !==
		null;
	return json(orderExists);
}
