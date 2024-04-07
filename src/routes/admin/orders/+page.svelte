<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { formatCurrency, formatNumber } from '$lib/utils.js';
	import { MoreVertical } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	let { data } = $props();
	console.log('🚀 ~ data:', data);
</script>

<PageHeader>Sales</PageHeader>
{#if data.orders.length == 0}
	<p>No sales found</p>
{:else}
	{@render orderTable()}
{/if}

{#snippet orderTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Product</Table.Head>
				<Table.Head>Customer</Table.Head>
				<Table.Head>Price Paid</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.orders as order}
				<Table.Row>
					<Table.Cell class="w-full">
						{order.product.name}
					</Table.Cell>
					<Table.Cell>
						{order.user.email}
					</Table.Cell>
					<Table.Cell>{formatCurrency(order.pricePaidInCents / 100)}</Table.Cell>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<MoreVertical />
								<span class="sr-only"> Actions </span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<form action="?/deleteOrderr" use:enhance method="POST">
									<button class=" w-full text-destructive">
										<DropdownMenu.Item type="submit">Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={order.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
