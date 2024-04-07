<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { superForm } from 'sveltekit-superforms';
	import { Input } from '$lib/components/ui/input';

	import Button from '$lib/components/ui/button/button.svelte';
	import { Loader } from 'lucide-svelte';

	let { data } = $props();

	const form = superForm(data.form);

	const { form: formData, enhance, delayed, message } = form;
</script>

<form class="mx-auto max-w-xl" action="/orders" use:enhance>
	<Card.Root>
		<Card.Header>
			<Card.Title>My Order</Card.Title>
			<Card.Description
				>Enter Your email and we will email you your order history and download link</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>Email</Form.Label>
					<Input {...attrs} bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			{#if $message}
				<div>
					{$message}
				</div>
			{:else}
				<Button type="submit" class="w-full">
					{#if $delayed}
						<Loader class="size-4 animate-spin" />
					{:else}
						send
					{/if}
				</Button>
			{/if}
		</Card.Footer>
	</Card.Root>
</form>
