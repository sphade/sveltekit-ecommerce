<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
	import { cn } from '$lib/utils';

	let { children } = $props();
	const pathname = $derived($page.url.pathname);
</script>


<Nav>
	{@render navLink({ href: '/', text: 'home' })}
	{@render navLink({ href: '/products', text: 'products' })}
	{@render navLink({ href: '/orders ', text: 'my Orders' })}
</Nav>
<div class="container my-6">
	{@render children()}
</div>


{#snippet navLink({href, text}:{href:string, text:string})}
	<a
		class={cn(
			'p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
			pathname === href && 'bg-background text-foreground'
		)}
		{href}>{text}</a
	>
{/snippet}
