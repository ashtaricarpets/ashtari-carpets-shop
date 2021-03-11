<template>
	<article class="media total">
		<div class="media-content">
			<div class="content">
				<p>
					<translate>Total (VAT excl.)</translate>
				</p>
				<p>
					<translate>VAT</translate>
				</p>
				<p><strong v-translate>Total (VAT incl.)</strong></p>
			</div>
		</div>
		<div class="media-right has-text-right">
			<p>€ {{ finalDisplayPrecise(totalExcl) }}</p>
			<p>€ {{ finalDisplayPrecise(vat) }}</p>
			<p><strong>€ {{ finalDisplayPrecise(totalIncl) }}</strong></p>
		</div>
	</article>
</template>

<script>
	import { mapState } from 'vuex';
	import { cartTotals, finalDisplayPrecise } from './utils';

	export default {
		props: ['products'],
		computed: {
			...mapState({
				userInfo: state => state.userInfo,
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
		methods: {
			finalDisplayPrecise,
		}
	};
</script>

<style>
</style>
