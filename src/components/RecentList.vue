<template>
	<div class="recent-products" v-if="products && products.length > 0">
		<h3 class="list-title">
			<translate>Recently viewed</translate>
			<span class="tag">{{ products.length }}</span>
		</h3>
		<div class="columns is-multiline">
			<sidebar-product :product="product" v-for="product in products" :key="product.id" class="is-2"></sidebar-product>
		</div>
	</div>
</template>

<script>
	import SidebarProduct from './../components/SidebarProduct.vue';

	export default {
		components: { SidebarProduct },
		computed: {
			products() {
				return this.$store.state.userInfo ? this.$store.state.userInfo.recentProducts : null;
			},
		},
		methods: {
			deleteRecent() {
				this.$store.dispatch('DELETE_RECENT');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.recent-products {
		margin-top: 3rem;
	}
</style>
<style lang="scss">
	.recent-products {
		.tag {
			margin-left: .7em;
			vertical-align: bottom;
		}
		.product-overview {
			.product-title {
				p {
					font-family: 'Crimson Text', serif;
					font-size: 1rem;
					padding-top: 0;
					line-height: 1.1em;
					padding: 0.5rem;
				}
				span {
					padding: 0 0.5rem;
				}
			}
		}
	}
</style>

