<template>
	<div class="column">
		<div class="product-overview card is-4by5">
			<div class="image">
				<img v-if="product.img && product.img[0]" v-lazy="thumbLocationLarge" />
			</div>
			<div class="discount" v-if="product.discount">
				<span class="percent">-{{ Math.round(product.discount) }}%</span>
			</div>
			<div class="option" v-if="product.option === 'yes'">
				<translate>option</translate>
			</div>
			<div class="overlay is-overlay">
				<div class="product-title" @click="goThere()">
					<p v-if="product.title">{{ product.title }}</p>
					<span v-if="product.subtitle">{{ product.subtitle }}</span>
				</div>
				<div class="buttons">
					<fav-button :product="product" v-if="hasFavButton" class="is-small"></fav-button>
					<router-link v-if="hasCartButton && product.custommade === 'yes'" :to="url" class="button is-small is-success" append>
						<i class="fa fa-fw fa-cart-arrow-down"></i>
					</router-link>
					<cart-button v-if="hasCartButton && product.custommade !== 'yes'" :product="product" class="is-small"></cart-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { slugify } from './utils.js';
	import config from '../config';
	import CartButton from './../components/CartButton.vue';
	import FavButton from './../components/FavButton.vue';

	export default {
		components: { CartButton, FavButton },
		props: {
			product: {
				type: Object,
			},
			hasFavButton: {
				type: Boolean,
				default: true,
			},
			hasCartButton: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				thumbLocationLarge: this.product.img && this.product.img[0] && this.product.img[0].includes('http') ?
					this.product.img[0] :
					`${config.imageLocation}/400/${this.product.img[0]}.jpg`,
			};
		},
		computed: {
			url() {
				return `/products/${this.product.id}---${slugify(this.product.title)}`;
			},
		},
		methods: {
			goThere() {
				this.$store.dispatch('SET_HOMEPAGE_SCROLL', window.scrollY);
				this.$router.push(`${this.url}`);
			}
		},
	};
</script>

<style lang="scss" scoped>
	// standard: less than 600px

	.product-overview {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		overflow: hidden;

		&.is-4by5 {
			height: 0;
			padding-bottom: 125%;
		}

		.image {
			img {
				opacity: 0;
				transition: opacity 0.3s ease-in;
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
		}
		.option,
		.discount {
			position: absolute;
			z-index: 10;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 60px 60px 0 0;
			top: 0;
			left: 0;

			span {
				position: absolute;
				top: -47px;
				left: 9px;
				color: white;
				text-align: center;
				transform: rotateZ(-45deg);
				font-size: 0.8em;
			}
		}
		.option {
			border-color: #da3 transparent transparent transparent;
		}
		.discount {
			border-color: #d33 transparent transparent transparent;
		}
		.overlay {
			display: flex;
			flex-direction: column;
			opacity: 0;
			align-content: space-between;
			transition: opacity 300ms ease-in-out;
			background-color: rgba(white, 0.8);
			> div {
				flex: 1;
				// justify-content: center;
				// align-items: center;
				color: black;
				padding: 0 0.5em;
				text-align: center;
				font-size: 60%;
			}
			.product-title {
				text-align: left;
				cursor: pointer;
			}
			.buttons {
				align-items: flex-end;
				padding: 0 .5rem 1rem;
				z-index: 20;
				.button {
					margin: 0 0.1em 0 0;
					.fa {
						font-size: 16px;
					}
				}
			}
		}
		&:hover .overlay {
			opacity: 1;
		}
	}

	.favorites {
		.flex-item .overlay {
			opacity: 1;
		}
	}
	.flex-item.fav .overlay {
		opacity: 1;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

</style>
