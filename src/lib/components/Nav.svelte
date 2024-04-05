<script lang="ts">
	import type { Snippet } from 'svelte';
	type NavType = {
		children: Snippet;
	};
	let { children }: NavType = $props();
</script>

<nav class="flex justify-center bg-primary px-4 text-primary-foreground">
	{@render children()}
</nav>
