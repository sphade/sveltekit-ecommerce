import { redirect } from '@sveltejs/kit';
import { db } from '../../../../../hooks.server';
import type { RequestHandler } from './$types';
import fs from 'fs/promises';

export const GET: RequestHandler = async ({ params: { downloadVerificationId } }) => {
	const data = await db.downloadVerification.findUnique({
		where: { id: downloadVerificationId, expiredAt: { gt: new Date() } },
		select: { product: { select: { filePath: true, name: true } } }
	});
	console.log('🚀 ~ constGET:RequestHandler= ~ data:', data);
	if (data === null) {
		redirect(303, '/products/download/expired');
	}
	const { size } = await fs.stat(data.product.filePath);
	const file = await fs.readFile(data.product.filePath);
	const extension = data.product.filePath.split('.').pop();

	return new Response(file, {
		headers: {
			'Content-Type': `application/${extension}`,
			'Content-Length': size.toString(),
			'Content-Disposition': `attachment; filename=${data.product.name}.${extension}`
		}
	});
};
