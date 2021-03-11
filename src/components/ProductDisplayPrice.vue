<template>
	<span>
		<span v-if="price != 0">
			<span :class="{ strikethrough: product.discount !== undefined }">€ {{ price }}
				<span v-if="product.custommade === 'yes' && !userRugSizeKnown">/m&sup2;</span>
			</span>
			<span v-if="product.discount !== undefined">
				€ {{ discountPrice }}
				<span v-if="product.custommade === 'yes' && !userRugSizeKnown">/m&sup2;</span>
			</span>
		</span>

		<translate v-else>Price on demand</translate>
	</span>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { finalDisplay, finalDisplayPrecise } from './utils';

	export default {
		props: ['product', 'precise'],
		computed: {
			...mapGetters(['width', 'length', 'userRugSizeKnown']),
			amount() {
				return this.product.amount || 1;
			},
			finalLength() {
				return this.product.customLength || this.length;
			},
			finalWidth() {
				return this.product.customWidth || this.width;
			},
			finalSizeSqm() {
				return this.finalLength * this.finalWidth / 10000;
			},
			price() {
				if (this.product.custommade === 'yes' && !this.userRugSizeKnown) {
					return this.precise ?
						finalDisplayPrecise(this.product.price_per_unit) :
						finalDisplay(this.product.price_per_unit);
				}
				if (this.product.custommade === 'yes' && this.userRugSizeKnown) {
					const total = this.finalSizeSqm * (this.product.price_per_unit || 0);
					return this.precise ?
						finalDisplayPrecise(total * this.amount) :
						finalDisplay(total * this.amount);
				}
				return this.precise ?
					finalDisplayPrecise(this.product.price * this.amount) :
					finalDisplay(this.product.price * this.amount);
			},
			discountPrice() {
				if (this.product.discount) {
					if (this.product.custommade === 'yes' && !this.userRugSizeKnown) {
						return this.precise ?
							finalDisplayPrecise(this.product.price_per_unit * (1 - this.product.discount * 0.01)) :
							finalDisplay(this.product.price_per_unit * (1 - this.product.discount * 0.01));
					}
					if (this.product.custommade === 'yes' && this.userRugSizeKnown) {
						const total = this.finalSizeSqm * (this.product.price_per_unit * (1 - this.product.discount * 0.01) || 0);
						return this.precise ?
							finalDisplayPrecise(total * this.amount) :
							finalDisplay(total * this.amount);
					}
					return this.precise ?
						finalDisplayPrecise(this.product.price * (1 - this.product.discount * 0.01) * this.amount) :
						finalDisplay(this.product.price * (1 - this.product.discount * 0.01) * this.amount);
				}
				return 0;
			}
		}
	};
</script>

<style lang="scss" >
	.strikethrough {
		font-size: 80%;
		text-decoration: line-through;
		vertical-align: top;
		margin-right: .5em;
	}
</style>
