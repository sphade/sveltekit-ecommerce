<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import type { Product } from '@prisma/client';
	import ProductCard from './ProductCard.svelte';

	type ProductGridSectionProps = {
		title: string;
		products: Product[];
	};

	let { title, products }: ProductGridSectionProps = $props();
</script>

<div class="space-y-4">
	<div class="flex gap-4">
		<h2 class="text-3xl font-bold capitalize">{title}</h2>
		<Button variant="outline" class="space-x-2" href="/products">
			<span> view all </span>
			<ArrowRight class="size-4" />
		</Button>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each products as product}
			<ProductCard {...product} />
		{/each}
	</div>
</div>
