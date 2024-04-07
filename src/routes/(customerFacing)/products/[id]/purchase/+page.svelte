<script lang="ts">
	import { PUBLIC_SERVER_URL, PUBLIC_STRIPE_PUBLIC_KEY } from '$env/static/public';
	import { formatCurrency } from '$lib/utils.js';
	import { loadStripe, type StripeElements, type Stripe } from '@stripe/stripe-js';
	import { Elements, PaymentElement, Address, LinkAuthenticationElement } from 'svelte-stripe';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { onMount } from 'svelte';
	import { Loader } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	let { data } = $props();
	let stripe: any = $state();
	let elements: any = $state(undefined);
	let isLoading = $state(false);
	let errorMessage: string | undefined = $state(undefined);
	let email: string | null = $state(null);

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_PUBLIC_KEY);
	});
	let productId = $derived(data.product.id);
	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		console.log('email', email);
		if (stripe === null || elements === null || isLoading === true || !email) return;
		isLoading = true;
		const orderExists = (
			await fetch('/api/order/exist', {
				method: 'POST',
				body: JSON.stringify({ email, productId }),
				headers: {
					'content-type': 'application/json'
				}
			})
		).json();
		console.log('checking if this order exist', await orderExists);
		if (await orderExists) {
			errorMessage =
				'you have already purchased this product. try downloading it from the my order page';
			isLoading = false;
			return;
		}
		if (stripe)
			stripe
				.confirmPayment({
					elements,

					confirmParams: {
						return_url: `${PUBLIC_SERVER_URL}/stripe/purchase-status`
					}
				})
				.then(({ error }) => {
					if (error) {
						if (error.type === 'card_error' || error.type === 'validation_error') {
							errorMessage = error?.message;
						} else {
							errorMessage = 'an unKnown error occurred';
						}
					}
				})
				.finally(() => {
					isLoading = false;
				});

		// log results, for debugging
		// console.log({ result });

		// if (result.error) {
		// 	// payment failed, notify user
		// 	error = result.error;
		// 	isLoading = false;
		// } else {
		// 	// payment succeeded, redirect to "thank you" page
		// 	goto('/examples/payment-element/thanks');
		// }
	}
</script>

<div class="mx-auto w-full max-w-5xl space-y-8">
	<div class="flex items-center gap-4">
		<img
			src={data.product.imagePath}
			class="aspect-video w-1/3 flex-shrink-0 object-cover"
			alt=""
		/>
		<div>
			<div class="text-lg">
				{formatCurrency(data.product.priceInCents / 100)}
			</div>

			<h1 class="text-2xl font-bold">
				{data.product.name}
			</h1>
			<div class="line-clamp-3 text-muted-foreground">
				{data.product.description}
			</div>
		</div>
	</div>
	<Elements {stripe} clientSecret={data.clientSecret} bind:elements>
		<form onsubmit={handleSubmit}>
			<Card.Root>
				<Card.Header>
					<Card.Title>Checkout</Card.Title>
					{#if errorMessage}
						<Card.Description class="text-destructive">{errorMessage}</Card.Description>
					{/if}
				</Card.Header>
				<Card.Content>
					<LinkAuthenticationElement
						on:change={(e) => {
							email = e.detail.value.email;
						}}
					/>
					<PaymentElement />
					<Address mode="billing" />
				</Card.Content>
				<Card.Footer>
					<Button
						type="submit"
						class="w-full"
						size="lg"
						disabled={stripe === null || elements === undefined}
					>
						{#if isLoading}
							<Loader class="size-4 animate-spin" />
						{:else}
							Purchase - {formatCurrency(data.product.priceInCents / 100)}
						{/if}
					</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	</Elements>
</div>
