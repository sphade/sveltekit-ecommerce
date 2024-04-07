<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { formatCurrency } from '$lib/utils';
	import Button from './ui/button/button.svelte';

	type ProductCardProps = {
		id: string;
		name: string;
		priceInCents: number;
		description: string;
		imagePath: string;
	};

	let { priceInCents, description, id, imagePath, name }: ProductCardProps = $props();
</script>

<Card.Root class="flex flex-col overflow-hidden">
	<img src={imagePath} class="aspect-video h-auto w-full object-cover" alt="" />
	<Card.Header>
		<Card.Title>{name}</Card.Title>
		<Card.Description>{formatCurrency(priceInCents / 100)}</Card.Description>
	</Card.Header>
	<Card.Content class="flex-grow">
		<p class="line-clamp-4">{description}</p>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" size="lg" href="/products/{id}/purchase">Purchase</Button>
	</Card.Footer>
</Card.Root>
