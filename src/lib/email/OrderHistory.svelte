<script lang="ts">
	import { Container, Head, Html, Preview, Section, Heading } from 'svelte-email';
	import OrderInformation from './component/OrderInformation.svelte';

	export let orders: {
		id: string;
		createdAt: Date;
		pricePaidInCents: number;
		downloadVerificationId: string;
		product: {
			name: string;
			imagePath: string;
			description: string;
		};
	}[];

	const fontFamily = 'font-sans';

	const main = {
		fontFamily,

		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px',
		maxWidth: '500px'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview="Order history and Downloads" />
	<Section style={main}>
		<Container style={container}>
			<Heading>Order History</Heading>
			{#each orders as order}
				<OrderInformation
					{order}
					product={order.product}
					downloadVerificationId={order.downloadVerificationId}
				/>
			{/each}
		</Container>
	</Section>
</Html>
