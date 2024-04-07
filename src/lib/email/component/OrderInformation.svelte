<script lang="ts">
	import { PUBLIC_SERVER_URL } from '$env/static/public';
	import { formatCurrency } from '$lib/utils';
	import {
		Button,
		Container,
		Head,
		Hr,
		Html,
		Img,
		Preview,
		Section,
		Text,
		Column
	} from 'svelte-email';

	export let order: {
		id: string;
		createdAt: Date;
		pricePaidInCents: number;
	};
	export let product: { imagePath: string; name: string; description: string };
	export let downloadVerificationId: string;

	const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	const main = {
		backgroundColor: '#ffffff'
	};

	const container = {
		margin: '0 auto',
		padding: '20px 0 48px'
	};

	const orderId = {
		margin: '0 auto'
	};

	const paragraph = {
		fontFamily,
		fontSize: '16px',
		lineHeight: '26px'
	};

	const btnContainer = {
		textAlign: 'center' as const
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

	const hr = {
		borderColor: '#cccccc',
		margin: '20px 0'
	};

	const footer = {
		fontFamily,
		color: '#8898aa',
		fontSize: '12px'
	};
	const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });
</script>

<Section style={main}>
	<Container style={container}>
		<Column>
			<Text>Order Id</Text>
			<Text>{order.id}</Text>
		</Column>
		<Column>
			<Text>Purchased on</Text>
			<Text>{dateFormatter.format(order.createdAt)}</Text>
		</Column>
		<Column>
			<Text>Price paid</Text>
			<Text>{formatCurrency(order.pricePaidInCents)}</Text>
		</Column>
	</Container>
</Section>
<Section style={main}>
	<Img
		src={`${PUBLIC_SERVER_URL}${product.imagePath}`}
		width="100%"
		height="50"
		alt="product image"
	/>
	<Container style={container}>
		<Column>
			<Text>{product.name}</Text>
		</Column>
		<Column>
			<Button style={button} href="{PUBLIC_SERVER_URL}/products/download/{downloadVerificationId}"
				>Download</Button
			>
		</Column>
		<Column>
			<Text>{product.description}</Text>
			<Text>{formatCurrency(order.pricePaidInCents)}</Text>
		</Column>
	</Container>
</Section>
