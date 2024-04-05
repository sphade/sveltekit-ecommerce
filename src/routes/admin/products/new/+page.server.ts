import { addFormSchema } from '$lib/formSchemas';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '../../../../hooks.server';
import fs from 'fs/promises';
import { redirect } from '@sveltejs/kit';
export const load = async () => {
	return {
		form: await superValidate(zod(addFormSchema))
	};
};
export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(addFormSchema));

		if (!form.valid) {
			return fail(400, { form });
		}
		await fs.mkdir('products', { recursive: true });
		const filePath = `products/${Math.random()}-${form.data.file.name}`;
		await fs.writeFile(filePath, Buffer.from(await form.data.file.arrayBuffer()));
		await fs.mkdir('static/products', { recursive: true });
		const imagePath = `/products/${Math.random()}-${form.data.image.name}`;
		await fs.writeFile(`static${imagePath}`, Buffer.from(await form.data.image.arrayBuffer()));
		try {
			await db.product.create({
				data: {
					name: form.data.name,
					description: form.data.description,
					priceInCents: form.data.priceInCents,
					filePath,
					imagePath,
					isAvailableForPurchase: false
				}
			});
		} catch (error) {
			console.log(error);
		}

		redirect(303, '/admin/products');
	}
};
