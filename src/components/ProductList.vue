<template>
	<div class="products">
		<div class="list columns is-multiline" v-infinite-scroll="loadMore" infinite-scroll-disabled="isBusy"
			infinite-scroll-distance="1500" infinite-scroll-listen-for-event="check-again">
			<product-overview :product="product" v-for="product in products" :key="product.id"></product-overview>
		</div>
		<div class="loading" v-if="isBusy && !isEndReached">
			<img src="/static/images/spinner.svg" />
		</div>
		<div class="server-error" v-if="isServerError">
			<article class="message is-warning">
				<div class="message-body">
					<translate>There's a problem with the server. We're retrying every 10 seconds.</translate>
				</div>
			</article>
		</div>
	</div>
</template>

<script type="text/javascript">
	import ProductOverview from './ProductOverview.vue';

	export default {
		components: { ProductOverview },
		computed: {
			products() {
				return this.$store.state.products;
			},
			isBusy: {
				get() {
					return this.$store.state.isBusy;
				},
			},
			isServerError: {
				get() {
					return this.$store.state.isServerError;
				},
			},
			isEndReached: {
				get() {
					return this.$store.state.isEndReached;
				},
			},
		},
		methods: {
			loadMore() {
				this.$store.dispatch('ADD_PRODUCTS').then(() => {
					this.$emit('check-again');
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.flex-container {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
	}

	.wrap {
		flex-wrap: wrap;
	}

	.loading {
		height: 10em;
		img {
			height: 100%;
			display: block;
			margin: 0 auto;
		}
	}
</style>
