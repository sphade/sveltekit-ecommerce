<script lang="ts">
	import PageHeader from '$lib/components/PageHeader.svelte';
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { formatCurrency, formatNumber } from '$lib/utils.js';
	import { MoreVertical } from 'lucide-svelte';
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

<PageHeader>Customers</PageHeader>
{#if data.users.length === 0}
	<p>No customer found</p>
{:else}
	{@render userTable()}
{/if}

{#snippet userTable()}
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-0">Email</Table.Head>
				<Table.Head>Orders</Table.Head>
				<Table.Head>Value</Table.Head>
				<Table.Head class="w-0 text-right">
					<span class="sr-only">Actions</span>
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.users as user}
				<Table.Row>
					<Table.Cell>
						{user.email}
					</Table.Cell>
					<Table.Cell>{formatNumber(user.Order.length)}</Table.Cell>
					<Table.Cell
						>{formatCurrency(
							user.Order.reduce((sum, o) => o.pricePaidInCents + sum, 0) / 100
						)}</Table.Cell
					>
					<Table.Cell class="text-right">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<MoreVertical />
								<span class="sr-only"> Actions </span>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<form action="?/deleteUser" use:enhance method="POST">
									<button class=" w-full text-destructive">
										<DropdownMenu.Item type="submit">Delete</DropdownMenu.Item>
									</button>
									<input type="hidden" name="id" value={user.id} />
								</form>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}
