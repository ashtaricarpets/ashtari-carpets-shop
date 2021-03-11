<template>
	<button class="snipcart-add-item button is-primary" @click="addToCart(product)"
		:data-item-id="product.custommade === 'yes' ? `${product.id}:${length}:${width}` : product.id"
		:data-item-name="product.title || product.id"
		:data-item-price="price || 0"
		:data-item-url="snipcartUrl"
		:data-item-description="product.description"
		:data-item-image="product.img && product.img[0] ? `${imageLocation}/200/${product.img[0]}.jpg` : ''"
		:data-item-custom1-custom="product.custommade"
		:data-item-custom2-subtitle="product.subtitle"
		:data-item-stackable="product.custommade === 'yes' ? false : true"
		:data-item-max-quantity="(product.stock !== undefined && product.custommade !== 'yes') ? product.stock : 99"
 		v-if="product.sold === undefined && product.option === undefined"
		:disabled="price == 0"
 		>
		<span class="icon">
			<i class="fa fa-fw fa-cart-plus"></i>
		</span>
		<product-display-price v-if="isShowingPrice" :product="product"></product-display-price>
	</button>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import config from '../config';
	import ProductDisplayPrice from './ProductDisplayPrice.vue';

	function roundTo(n, digits) {
		digits = digits || 0;
		return Math.round(n * 10 ** digits) / 10 ** digits;
	}

	export default {
		components: { ProductDisplayPrice },
		props: ['product', 'isShowingPrice'],
		data() {
			return {
				imageLocation: config.imageLocation,
			};
		},
		computed: {
			...mapGetters(['width', 'length']),
			price() {
				return this.product.custommade === 'yes' ?
					roundTo(this.length * this.width * (this.product.price_per_unit * (1 - (this.product.discount || 0) * 0.01) || 0) / 10000, 2) :
					roundTo(this.product.price * (1 - (this.product.discount || 0) * 0.01) || 0, 2);
			},
			snipcartUrl() {
				return this.product.custommade === 'yes'
					? `${config.snipcartControlUrl}${this.product.id}:${this.length}:${this.width}/${this.length}/${this.width}`
					: `${config.snipcartControlUrl}${this.product.id}`;
			},
		},
		methods: {
			...mapActions({
				addToCart: 'ADD_TO_CART',
			})
		}
	};
</script>

<style>

</style>
