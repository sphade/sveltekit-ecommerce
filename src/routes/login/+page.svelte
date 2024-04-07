<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Loader from 'lucide-svelte/icons/loader';
	import * as Form from '$lib/components/ui/form';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	import { loginSchema } from '$lib/formSchemas';
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(loginSchema)
	});
	const { form: formData, enhance, delayed } = form;
</script>

<form use:enhance method="POST" class="grid h-screen w-full place-items-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account.</Card.Description>
		</Card.Header>
		<Card.Content class="grid gap-4">
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>user name</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Button type="submit">
				{#if $delayed}
					<Loader class="size-4 animate-spin" />
				{:else}
					sign in
				{/if}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
