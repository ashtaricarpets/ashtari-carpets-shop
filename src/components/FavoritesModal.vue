<template>
	<div class="modal" :class="{ 'is-active': isFavoritesModalOpen }">
		<div class="modal-background"></div>
		<div class="modal-card" v-if="!isSent">
			<header class="modal-card-head">
				<h2 class="modal-card-title" v-translate>My wishlist</h2>
			</header>
			<div class="modal-card-body" v-if="products.length > 0">
				<form>
					<div class="columns is-multiline">
						<sidebar-product :product="product" v-for="product in products" :key="product.id" :has-cart-button="true"
							:has-fav-button="false" class="is-3"></sidebar-product>
					</div>
					<div class="field">
						<label class="checkbox">
							<input type="checkbox" value="thuispresentatie" v-model="favoritesOptions" />
							<translate>I want a presentation at home for these rugs</translate>
						</label><br />
						<label class="checkbox">
							<input type="checkbox" value="bekijken-in-winkel" v-model="favoritesOptions" />
							<translate>I want to see these items in your shop</translate>
						</label><br />
						<label class="checkbox">
							<input type="checkbox" value="graag-meer-info" v-model="favoritesOptions" />
							<translate>I want more information about these items</translate>
						</label><br />
						<!-- <label class="checkbox">
								<input type="checkbox" value="doorsturen" v-model="favoritesOptions" />
								<translate>I want to forward this list to a friend</translate>
							</label> -->
					</div>

					<div class="field">
						<label class="label" v-translate>Your name</label>
						<div class="control has-icons-left">
							<input class="input" type="text" required="required" name="name" v-model="name" :placeholder="placeholders.name"
							/>
							<span class="icon is-small is-left">
								<i class="fa fa-user"></i>
							</span>
						</div>
					</div>

					<div class="field">
						<label class="label" v-translate>Email or phone</label>
						<div class="control has-icons-left">
							<input class="input" required="required" name="contact" v-model="contact" :placeholder="placeholders.email"
							/>
							<span class="icon is-small is-left">
								<i class="fa fa-envelope"></i>
							</span>
						</div>
					</div>

					<div class="field" v-if="favoritesOptions.includes('forward')">
						<label class="label" v-translate>Forward to</label>
						<div class="control has-icons-left">
							<input class="input" name="forward" v-model="forward" :placeholder="placeholders.email"
							/>
							<span class="icon is-small is-left">
								<i class="fa fa-envelope"></i>
							</span>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-card-body" v-if="products.length === 0">
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
				<p>
					Hier verschijnen de tapijten en kelims die u toevoegt aan uw wishlist.
				</p>
			</div>
			<footer class="modal-card-foot">
				<button class="button" @click="closeModal" v-translate>Close</button>
				<button class="button is-primary" :class="{ 'is-loading': isSending }" :disabled="!canSend || isSending" @click="checkAndSend" v-if="products.length > 0">
					<span class="icon">
						<i class="fa fa-heart"></i>
					</span>&nbsp;
					<translate>Send favorites to Ashtari</translate>&nbsp;
					<span class="icon">&rarr;</span>
				</button>
			</footer>
		</div>
		<div class="modal-card" v-if="isSent">
			<div class="modal-card-body sent">
				<i class="fa fa-3x fa-paper-plane-o"></i>
				<h3 v-translate>Thank you!</h3>
				<p v-translate>These favorites are sent.</p>
				<p v-translate>We'll contact you as soon as possible.</p>
			</div>
			<footer class="modal-card-foot">
				<button class="button" @click="closeModal" v-translate>Close</button>
			</footer>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex';
	import SidebarProduct from './SidebarProduct.vue';
	import { validateEmail, validatePhone } from './utils.js';

	export default {
		components: {
			SidebarProduct,
		},
		data() {
			return {
				isSending: false,
				placeholders: {
					name: this.$gettext('e.g. Alex Smith'),
					email: this.$gettext('e.g. alex.smith@gmail.com'),
				}
			};
		},
		computed: {
			...mapState({
				products: state => state.userInfo.favoriteProducts,
				sentFavorites: state => state.userInfo.sentFavorites,
				isFavoritesModalOpen: state => state.isFavoritesModalOpen,
			}),
			name: {
				get() {
					return this.$store.state.userInfo.name;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_NAME', value);
				}
			},
			contact: {
				get() {
					return this.$store.state.userInfo.contact;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_CONTACT', value);
				}
			},
			favoritesOptions: {
				get() {
					return this.$store.state.userInfo.favoritesOptions;
				},
				set(value) {
					console.log('value', value);
					this.$store.commit('UPDATE_FAVORITES_OPTIONS', value);
				}
			},
			isSent() {
				const current = this.products.map(p => p.id).sort();
				console.log(current);
				if (this.sentFavorites.length === 0 && current.length === 0) return false;
				if (this.sentFavorites.length !== current.length) return false;
				return current.map((v, i) => v === this.sentFavorites[i]).reduce((p, c) => p && c, true);
				// return false;
			},
			canSend() {
				return (validatePhone(this.contact) || validateEmail(this.contact)) && this.name;
			}
		},
		methods: {
			...mapActions({
				sendFavorites: 'SEND_FAVORITES',
				setFavoritesModalOpen: 'SET_FAVORITES_MODAL_OPEN'
			}),
			checkAndSend() {
				if (this.canSend) {
					this.isSending = true;
					this.sendFavorites().then((result) => {
						if (result === 'ok') {
							console.log('favorites sent');
							this.$emit('sent');
						}
						if (result === 'nok') {
							console.error('favorites not sent');
						}
					}).finally(() => {
						this.isSending = false;
					});
				}
			},
			closeModal() {
				this.setFavoritesModalOpen(false);
			},

		}
	};
</script>

<style scoped>
	.modal-card-head,
	.modal-card-foot {
		background-color: white;
		border: 0;
	}

	.modal-card-foot {
		justify-content: flex-end;
	}
	.heart {
		color: red;
	}
</style>
