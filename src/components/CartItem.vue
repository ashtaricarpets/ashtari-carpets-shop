<template>
	<article class="media">
		<div class="media-left">
			<figure class="image is-64x64">
				<img v-if="product.img && product.img[0]" v-lazy="thumbLocationSmall" />
			</figure>
		</div>
		<div class="media-content">
			<div class="content">
				<p>
					<strong>{{ product.title || product.id }}</strong>
				</p>
			</div>
			<nav class="level is-mobile">
					<div class="level-left">
						<small>&times; {{ product. amount }}</small>
						<a class="level-item" aria-label="add-less" @click="removeOne(product)">
							<span class="icon is-small">
								<i class="fa fa-fw" :class="{ 'fa-minus': product.amount > 1, 'fa-trash-o': product.amount === 1 }"></i>
							</span>
						</a>
						<a class="level-item" aria-label="add-more" v-if="product.amount < product.stock" @click="addOne(product)">
							<span class="icon is-small">
								<i class="fa fa-fw fa-plus"></i>
							</span>
						</a>
					</div>
				</nav>
		</div>
		<div class="media-right has-text-right">
			<product-display-price :product="product" :precise="true"></product-display-price>
		</div>

	</article>
</template>

<script>
	import { mapActions } from 'vuex';
	import config from '../config';
	import ProductDisplayPrice from './ProductDisplayPrice.vue';

	export default {
		components: { ProductDisplayPrice },
		props: ['product'],
		data() {
			return {
				thumbLocationSmall:
					this.product.img && this.product.img[0] && this.product.img[0].includes('http') ?
					this.product.img[0] : `${config.imageLocation}/200/${this.product.img[0]}.jpg`,
			};
		},
		methods: {
			...mapActions({
				addOne: 'ADD_TO_CART',
				removeOne: 'REMOVE_ONE_FROM_CART',
			})
		}
	};
</script>

<style>
	.media + .media {
		border: 0;
	}
</style>
