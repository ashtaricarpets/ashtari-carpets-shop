<template>
	<div class="favorites">
		<h3 class="list-title" v-if="products.length > 0">
			<translate>My wishlist</translate>
			<span class="tag">{{ products.length }}</span>
		</h3>
		<div class="columns is-tablet">
			<div class="column has-scroll">
				<div v-if="!products || products && products.length === 0">
					<p>
						U gaat niet over één nacht ijs bij de aankoop van een tapijt.
						U wil een tapijt met eigen ogen zien, de wol en zijde aanraken met uw eigen handen, de authentieke vezels ruiken,
						horen welke invloed het heeft op de akoestiek van uw huis. Dat beseffen wij ook heel goed.
					</p>
					<p>
						Daarom organiseren wij een <b>gratis, vrijblijvende presentatie</b> van tapijten of kelims <b>bij u thuis</b>.
						Voeg tapijten die bij u in de smaak vallen aan uw wishlist toe met het hartje <i class="heart fa fa-heart-o"></i> en
						stuur ze ons met één klik door. Wij maken een afspraak en komen bij u langs.
						Dat geeft u meer vertrouwen om de uiteindelijke aankoop te doen.
					</p>
				</div>
				<div class="columns is-mobile" v-if="products && products.length > 0">
					<sidebar-product :product="product" v-for="product in products" :key="product.id"
					class="is-four-fifths-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-fullhd"></sidebar-product>
				</div>

			</div>
			<div class="column is-narrow call-out" v-if="products && products.length > 0">
				<div class="card is-shadowless">
					<div class="card-content">
						<label class="checkbox">
							<input type="checkbox" value="thuispresentatie" v-model="favoritesOptions" />
							<translate>home presentation</translate>
						</label>
						<label class="checkbox">
							<input type="checkbox" value="bekijken-in-winkel" v-model="favoritesOptions" />
							<translate>see in shop</translate>
						</label>
						<label class="checkbox">
							<input type="checkbox" value="graag-meer-info" v-model="favoritesOptions" />
							<translate>more info</translate>
						</label>
						<!-- <label class="checkbox">
							<input type="checkbox" value="doorsturen" v-model="favoritesOptions" />
							<translate>forward</translate>
						</label> -->
						<p></p>
						<a class="send-button" @click="setFavoritesModalOpen(true)">
							<span class="icon is-small">
								<i class="fa fa-paper-plane-o"></i>
							</span>
							<translate>Send...</translate>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapActions } from 'vuex';
	import SidebarProduct from './SidebarProduct.vue';

	export default {
		components: { SidebarProduct },
		data() {
			return {
				isModalOpen: false,
				isModalThanksOpen: false,
			};
		},
		computed: {
			products() {
				return this.$store.state.userInfo ? this.$store.state.userInfo.favoriteProducts : null;
			},
			favoritesOptions: {
				get() {
					return this.$store.state.userInfo.favoritesOptions;
				},
				set(value) {
					this.$store.commit('UPDATE_FAVORITES_OPTIONS', value);
				}
			},
		},
		methods: {
			...mapActions({
				setFavoritesModalOpen: 'SET_FAVORITES_MODAL_OPEN'
			}),
		},
	};
</script>


<style lang="scss" scoped>
	.favorites {
		// border: 1px solid lightgray;
		// border-radius: 3px;
		// padding: 0.5rem;
		margin-bottom: 2rem;

		.has-scroll {
			overflow: scroll;
		}

		.call-out {
			min-width: 16.666666%;
			font-size: 90%;
			.checkbox input, .radio input {
				margin-right: 0.3em;
			}
			.card {
				height: 100%;
				background-color: #fed602;
			}
		}

		.send-button .icon {
			margin-right: .4em;
		}
	}

	form {
		box-sizing: border-box;
		padding: 0 2em;
		width: 100%;
	}

	label {
		display: block;
	}

	.card a {
		cursor: pointer;
	}

	.heart {
		color: red;
	}
</style>
<style lang="scss">
	.favorites {
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

