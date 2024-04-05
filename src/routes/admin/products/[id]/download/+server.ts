import { text } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server';
import fs from 'fs/promises';
export async function GET({ params: { id } }) {
	const product = await db.product.findUnique({
		where: { id },
		select: {
			filePath: true,
			name: true
		}
	});
	if (!product) return new Response('product does not exist ');
	const { size } = await fs.stat(product.filePath);
	const file = await fs.readFile(product.filePath);
	const extension = product.filePath.split('.').pop();

	return new Response(file, {
		headers: {
			'Content-Type': `application/${extension}`,
			'Content-Length': size.toString(),
			'Content-Disposition': `attachment; filename=${product.name}.${extension}`
		}
	});
}
