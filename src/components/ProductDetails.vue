<template>
	<div>
		<back-button></back-button>
		<div class="columns is-reversed-mobile is-variable is-8">
			<div class="column">
				<div class="card" v-for="im in product.img" :key="im">
					<a :href="`#${slug(im)}`">
						<div class="image is-4by5">
							<img class="lazy-image" v-lazy="`${imageLocation}/12/${im}.jpg`" :data-srcset="`${imageLocation}/200/${im}.jpg 200w,
								${imageLocation}/400/${im}.jpg 400w,
								${imageLocation}/600/${im}.jpg 600w,
								${imageLocation}/orig/${im}.jpg, `" sizes="50%" />
						</div>
					</a>
					<a href="#_" class="lightbox" :id="`${slug(im)}`">
						<img :src="`${imageLocation}/orig/${im}.jpg`" />
					</a>
				</div>
			</div>
			<div class="column">
				<product-details-text class="sticky" :product="product"></product-details-text>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	import BackButton from './BackButton.vue';
	import ProductDetailsText from './ProductDetailsText.vue';
	import config from '../config';
	import { slugify } from './utils.js';

	export default {
		components: { ProductDetailsText, BackButton },
		data() {
			return {
				imageLocation: config.imageLocation,
			};
		},
		computed: {
			...mapGetters(['product']),
		},
		watch: {
			'$route.params.id': function set() {
				this.reload();
			}
		},
		created() {
			this.reload();
		},
		metaInfo() {
			return {
				title: this.product ? this.product.title || '' : '',
				titleTemplate: '%s - Ashtari Carpets Webshop',
				meta: [
					{ description: this.product ? this.product.description || this.product.metadescription || this.product.id : '' },
					{ keywords: this.product ? this.product.metakeywords || '' : '' }
				],
			};
		},
		methods: {
			...mapActions({
				setCurrentProduct: 'SET_CURRENT_PRODUCT'
			}),
			reload() {
				window.scroll(0, 0);
				this.setCurrentProduct((this.$route.params.id || '').split('---')[0]);
			},
			images() {
				console.log('this.product', this.product);
				if (!this.product) return [];
				const keys = Object.keys(this.product.img);
				return (keys.map(k => this.product.img[k]) || []).map(im => ({
					src: `${this.imageLocation}/orig/${im}.jpg`
				}));
			},
			slug(text) {
				return slugify(text);
			}
		}
	};
</script>

<style lang="scss">
	.sticky {
		position: sticky;
		top: 5.75rem;
	}
</style>
<style lang="scss" scoped>
	@media screen and (max-width: 600px) {
		.is-reversed-mobile {
			display: flex;
			flex-direction: column-reverse;
		}
	}

	.card {
		margin-bottom: 1.5rem;
		padding: 0.75rem;
	}

	img.lazy-image {
		box-sizing: border-box;
		width: 100%;
		opacity: 0;
		transition: opacity 300ms ease-in-out;
		will-change: opacity;
		display: block;
		&[lazy='loading'],
		&[lazy='error'] {
			opacity: 0.2;
			width: 50%;
			margin: 43% auto -43%;
		}
		&[lazy='loaded'] {
			opacity: 1;
			// animation: fadeIn 1.5s;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.lightbox {
		/** Default lightbox to hidden */
		display: none;

		/** Position and style */
		position: fixed;
		z-index: 1000002;
		width: 100%;
		height: 100vh;
		text-align: center;
		top: 0;
		left: 0;
		background: white;
		padding: .5rem;
	}

	.lightbox img {
		/** Pad the lightbox image */
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		max-width: 100%;
		max-height: 100%;
	}

	.lightbox:target {
		/** Remove default browser outline */
		outline: none;

		/** Unhide lightbox **/
		display: block;
	}
</style>
