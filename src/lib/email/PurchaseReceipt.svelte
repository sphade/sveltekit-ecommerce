<script lang="ts">
	import { Container, Head, Html, Preview, Section, Heading } from 'svelte-email';
	import OrderInformation from './component/OrderInformation.svelte';

	export let product: {
		name: string;
		imagePath: string;
		description: string;
	};
	export let downloadVerificationId: string;
	export let order: {
		id: string;
		createdAt: Date;
		pricePaidInCents: number;
	};

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

	const button = {
		fontFamily,
		backgroundColor: '#5F51E8',
		borderRadius: '3px',
		color: '#fff',
		fontSize: '16px',
		textDecoration: 'none',
		textAlign: 'center' as const,
		display: 'block'
	};
</script>

<Html lang="en">
	<Head />
	<Preview preview={'download {product.name} and view receipt'} />
	<Section style={main}>
		<Container style={container}>
			<Heading>Purchase Receipt</Heading>
			<OrderInformation {order} {product} {downloadVerificationId} />
		</Container>
	</Section>
</Html>
