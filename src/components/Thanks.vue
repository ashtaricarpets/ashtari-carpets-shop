<template>
	<div class="main">
		<div class="columns is-mobile is-gapless">
			<div class="column has-padding">
				<top-header></top-header>
				<h1 v-translate>Thank you!</h1>
				<p v-translate>Thank you for your order! We'll get right on it.</p>
				<p v-translate>You ordered:</p>
				<cart-item :product="product" v-for="product in products" :key="product.id"></cart-item>
				<article class="media total">
					<div class="media-left">
						<figure class="image is-64x64">
						</figure>
					</div>
					<div class="media-content">
						<div class="content">
							<p>{{ userInfo.shippingMethod.description }}</p>
						</div>
					</div>
					<div class="media-right">
						<p>€ {{ shippingCost }}</p>
					</div>
				</article>
				<cart-summary :products="products"></cart-summary>
				<recent-list></recent-list>
			</div>
			<div class="column is-hidden-touch is-narrow">
				<sidebar></sidebar>
			</div>
		</div>
		<bottom-footer></bottom-footer>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import { cartTotals, finalDisplayPrecise } from './utils';
	import Sidebar from './Sidebar.vue';
	import TopHeader from './TopHeader.vue';
	import BottomFooter from './BottomFooter.vue';
	import RecentList from './RecentList.vue';
	import CartItem from './CartItem.vue';
	import CartSummary from './CartSummary.vue';

	export default {
		components: {
			Sidebar, TopHeader, BottomFooter, RecentList, CartItem, CartSummary
		},
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
				products: state => state.userInfo.lastOrderedProducts,
				shippingCost: state => finalDisplayPrecise(state.userInfo.shippingMethod.cost),
			}),
			totalIncl() {
				if (this.userInfo.shippingMethod) return cartTotals(this.products).total + this.userInfo.shippingMethod.cost;
				return cartTotals(this.products).total;
			},
			vat() {
				if (this.userInfo.shippingMethod) return cartTotals(this.products).vat + (this.userInfo.shippingMethod.cost / 1.21);
				return cartTotals(this.products).vat;
			},
			totalExcl() {
				return this.totalIncl - this.vat;
			},
		},
		mounted() {
			this.copyCartToLastOrdered();
			this.closeCart();
		},
		methods: {
			...mapActions({
				copyCartToLastOrdered: 'COPY_CART_TO_LAST_ORDERED',
				closeCart: 'CLOSE_CART',
			}),
			finalDisplayPrecise,
		}
	};
</script>

<style scoped>
	/deep/ .level-item {
		display: none;
	}
</style>

