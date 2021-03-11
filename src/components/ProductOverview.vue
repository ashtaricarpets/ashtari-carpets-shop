<template>
	<div class="column is-half is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd">
		<div class="product-overview card is-4by5" :class="`${product.category}`">
			<div class="is-favorite" v-if="isFav">
				<i class="fa fa-heart" @click="removeFromFavs(product)"></i>
			</div>
			<div class="image">
				<img v-if="product.img && product.img[0]" v-lazy="`${imageLocation}/400/${product.img[0]}.jpg`" />
			</div>
			<div class="discount" v-if="product.discount">
				<span class="percent">-{{ Math.round(product.discount) }}%</span>
			</div>
			<div class="option" v-if="product.option !== undefined">
				<translate>option</translate>
			</div>
			<div class="sold" v-if="product.sold !== undefined">
				<translate>sold</translate>
			</div>
			<div class="overlay">
				<div class="product-title" @click="goThere()">
					<h5 v-if="product.title">{{ product.title }}</h5>
					<h5 v-if="product.title === undefined">{{ product.id }}</h5>
					<p v-if="product.subtitle">{{ product.subtitle }}</p>
					<p v-if="product.title !== undefined"><small>{{ product.id }}</small></p>
				</div>
				<div class="size" @click="goThere()">
					<p v-if="!userRugSizeKnown && product.custommade === 'yes'" v-translate>Custom made!</p>
					<p v-if="userRugSizeKnown && product.custommade === 'yes'">
						<translate>Your dimensions:</translate><br />
						<span class="length">{{ length }}</span> x
						<span class="width">{{ width }}</span> cm
					</p>
					<p v-if="product.custommade !== 'yes'">
						<span class="length">{{ product.length }}</span> x
						<span class="width">{{ product.width }}</span> cm
					</p>
				</div>
				<!-- <div class="price">
					<product-display-price :product="product"></product-display-price>
				</div> -->
				<div class="buttons">
					<fav-button :product="product" class="is-small"></fav-button>
					<a v-if="product.custommade === 'yes'" @click="goThere()" class="button is-small is-primary">
						<i class="fa fa-cart-plus"></i>
					</a>
					<cart-button v-else :product="product" :is-showing-price="true" class="is-small"></cart-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapActions, mapGetters } from 'vuex';
	import { slugify } from './utils.js';
	import config from '../config';
	import CartButton from './CartButton.vue';
	import FavButton from './FavButton.vue';

	export default {
		components: { CartButton, FavButton },
		props: ['product'],
		data() {
			return {
				imageLocation: config.imageLocation,
			};
		},
		dependencies: ['heartBurst'],
		computed: {
			...mapGetters(['width', 'length', 'userRugSizeKnown', 'favoriteProductIds']),
			url() {
				return `/products/${this.product.id}---${slugify(this.product.title)}`;
			},
			isFav() {
				return this.favoriteProductIds.includes(this.product.id);
			},
		},
		methods: {
			...mapActions({
				setScroll: 'SET_HOMEPAGE_SCROLL',
				setCurrentProduct: 'SET_CURRENT_PRODUCT',
				removeFromFavs: 'REMOVE_FROM_FAVS',
			}),
			goThere() {
				this.setScroll(window.scrollY);
				this.setCurrentProduct(this.product.id);
				this.$router.push(this.url);
			}
		},
	};
</script>

<style lang="scss" scoped>
	.product-overview {
		box-sizing: border-box;
		position: relative;
		width: 100%;
		overflow: hidden;
		font-size: 90%;
		transition: transform 400ms;

		&.is-4by5 {
			height: 0;
			padding-bottom: 125%;
		}

		&:hover {
			transform: scale(1.03);
		}

		.is-favorite {
			position: absolute;
			z-index: 30;
			right: .5em;
			top: .3em;
			font-size: 1rem;

			.fa-heart {
				color: red;
				cursor: pointer;
				&::before {
					text-shadow: -2px 0 white, 0 2px white, 2px 0 white, 0 -2px white;
				}
			}
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
		.discount,
		.sold {
			position: absolute;
			z-index: 10;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 70px 70px 0 0;
			top: 0;
			left: 0;

			span {
				position: absolute;
				top: -54px;
				left: 4px;
				color: white;
				text-align: center;
				transform: rotateZ(-45deg);
			}
		}
		.option {
			border-color: #da3 transparent transparent transparent;
		}
		.sold {
			border-color: #da3 transparent transparent transparent;
		}
		.discount {
			border-color: #d33 transparent transparent transparent;
		}
		.overlay {
			display: flex;
			flex-direction: column;
			position: absolute;
			z-index: 20;
			top: 0;
			left: 0;
			opacity: 0;
			align-content: space-between;
			height: 100%;
			width: 100%;
			transition: opacity 300ms ease-in-out;
			background-color: rgba(white, 0.8);
			> div {
				flex: 1;
				// justify-content: center;
				// align-items: center;
				color: black;
				padding: .5rem 1rem;
				// text-align: center;
				cursor: pointer;
			}
			.product-title {
				text-align: left;
				p {
					line-height: 1.1em;
				}
			}
			.buttons {
				align-items: flex-end;
				padding: 0 1rem 1rem;
				.button {
					margin: 0 .5rem .5rem 0;
					.fa {
						font-size: 16px;
					}
				}
			}
		}
		&:hover .overlay, &.toebehoren .overlay {
			opacity: 1;
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
</style>
