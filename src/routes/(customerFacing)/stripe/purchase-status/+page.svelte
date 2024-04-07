<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { formatCurrency } from '$lib/utils';
	let { data } = $props();
</script>

<div class="mx-auto w-full max-w-5xl space-y-8">
	<h1 class="text-4xl font-bold">
		{#if data.isSuccess}
			Success
		{:else}
			Error
		{/if}
	</h1>
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
			<Button class="mt-4" size="lg"
				>{#if data.isSuccess}
					<a href="/products/download/{data.downloadVerification}">download</a>
				{:else}
					<a href="/products/{data.product.id}/purchase">try again</a>
				{/if}</Button
			>
		</div>
	</div>
</div>
