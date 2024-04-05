<script lang="ts">
  import { page } from '$app/stores';
  import Nav from '$lib/components/Nav.svelte';
  import { cn } from '$lib/utils';

    let { children } = $props();
    const pathname = $derived($page.url.pathname)
</script>
{#snippet navLink({href, text}:{href:string, text:string})}
    <a class={cn('p-4 hover:bg-secondary capitalize hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',pathname === href && 'bg-background text-foreground')} {href}>{text}</a>
{/snippet}


<Nav>
    {@render navLink({href: '/admin', text: 'dashboard'})}
    {@render navLink({href: '/admin/products', text: 'products'})}
    {@render navLink({href: '/admin/users', text: 'Users'})}
    {@render navLink({href: '/admin/orders', text: 'Orders'})}
</Nav>
<div class="container my-6" >
    {@render children()}
</div>

