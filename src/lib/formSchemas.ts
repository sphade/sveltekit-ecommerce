import { z } from 'zod';
export const addFormSchema = z.object({
	name: z.string().min(3),
	priceInCents: z.number({ coerce: true }),
	description: z.string().min(5),
	file: z
		.instanceof(File, { message: 'Please upload a file.' })
		.refine((f) => f.size > 0, 'required.'),
	image: z
		.instanceof(File)
		.refine((f) => f.size > 0 || f.type.startsWith('image/'), 'Max 100 kB upload size.')
});
export const loginSchema = z.object({
	username: z.string().min(3),
	password: z.string().min(3)
});
