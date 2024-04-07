<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { fileProxy, superForm } from 'sveltekit-superforms';
	import Loader from 'lucide-svelte/icons/loader';
	import * as Form from '$lib/components/ui/form';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Input } from '$lib/components/ui/input';
	import { addFormSchema } from '$lib/formSchemas';
	import { formatCurrency } from '$lib/utils';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(addFormSchema)
	});

	const { form: formData, enhance, delayed } = form;
	const image = fileProxy(formData, 'image');
	const file = fileProxy(formData, 'file');
</script>

<PageHeader>Add Product</PageHeader>

<form
	method="POST"
	class="space-y-8"
	action="/admin/products/new"
	enctype="multipart/form-data"
	use:enhance
>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="priceInCents">
		<Form.Control let:attrs>
			<Form.Label>Price In Cents</Form.Label>
			<Input {...attrs} type="number" bind:value={$formData.priceInCents} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="text-muted-foreground">
		{formatCurrency($formData.priceInCents / 100)}
	</div>
	<Form.Field {form} name="description">
		<Form.Control let:attrs>
			<Form.Label>Description</Form.Label>
			<Textarea {...attrs} bind:value={$formData.description} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="file">
		<Form.Control let:attrs>
			<Form.Label>File</Form.Label>
			<input {...attrs} type="file" bind:files={$file} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="image">
		<Form.Control let:attrs>
			<Form.Label>Image</Form.Label>
			<input {...attrs} type="file" accept="image/*" bind:files={$image} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Button type="submit">
		{#if $delayed}
			<Loader class="size-4 animate-spin" />
		{:else}
			save
		{/if}
	</Button>
</form>
