<template>
	<div class="cart" v-if="products && products.length > 0">
		<p>
			<button class="button is-success snipcart-checkout" @click="openCart" v-if="products && products.length > 0">
				<span class="icon is-small">
					<i class="fa fa-shopping-cart"></i>
				</span>
				<translate>My cart</translate>
				&nbsp;
				<span class="tag is-small">{{ products.map(p => p.amount).reduce((p, c) => p + c, 0) }}</span>
			</button>
		</p>
		<div class="columns is-multiline" v-if="products && products.length > 0" @click.self="openCart">
			<sidebar-product :product="product" v-for="product in products" :key="product.id"
			 :has-cart-button="false" :has-fav-button="false" class="is-half"></sidebar-product>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import SidebarProduct from './../components/SidebarProduct.vue';

	export default {
		components: { SidebarProduct },
		computed: {
			...mapState({
				products: state => state.userInfo.cartProducts,
			}),
		},
		methods: {
			...mapActions({
				openCart: 'OPEN_CART',
			}),
		},
	};
</script>

<style lang="scss" scoped>
	.cart {
		padding: 0 0 1rem;
		background-color: lighten(#2b854a, 50);
		margin-bottom: 1px;
	}

	p {
		text-align: center;
	}

	.tag {
		border-radius: 1em;
	}

	button.snipcart-checkout {
		width: 100%;
		border-radius: 0;
	}

	.columns {
		cursor: pointer;
		padding: 0.75rem;
	}
</style>
