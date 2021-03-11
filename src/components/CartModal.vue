<template>
	<div class="modal" :class="{ 'is-active': isCartOpen }">
		<div class="modal-background" @click="closeCart"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<!-- <h2 class="modal-card-title" v-translate>My cart</h2> -->
				<div class="tabs is-fullwidth is-toggle">
					<ul>
						<li :class="{ 'is-active': currentTab === 'myCart' }" @click="setCurrentTab('myCart')">
							<a>
								<span><i class="fa fa-shopping-cart"></i></span>&nbsp;
								<translate>My cart</translate>
							</a>
						</li>
						<li :class="{ 'is-active': currentTab === 'myAddress', 'is-disabled': products.length === 0 }" @click="setCurrentTab('myAddress')">
							<a>
								<span><i class="fa fa-address-card"></i></span>&nbsp;
								<translate>My address</translate>
							</a>
						</li>
						<li :class="{ 'is-active': currentTab === 'shippingMethod', 'is-disabled': !hasAllRequiredFilledIn }" @click="setCurrentTab('shippingMethod')">
							<a>
								<span><i class="fa fa-truck"></i></span>&nbsp;
								<translate>Shipping Method</translate>
							</a>
						</li>
						<li :class="{ 'is-active': currentTab === 'payment', 'is-disabled': !canOrder }" @click="setCurrentTab('payment')">
							<a>
								<span><i class="fa fa-credit-card"></i></span>&nbsp;
								<translate>Payment</translate>
							</a>
						</li>
					</ul>
				</div>
			</header>
			<section class="modal-card-body" v-if="currentTab === 'myCart'">
				<div class="cart-empty" v-if="products.length === 0">
					<translate>Your cart is empty.</translate>
				</div>
				<cart-item :product="product" v-for="product in products" :key="product.id"></cart-item>
				<cart-summary :products="products" v-if="products.length > 0"></cart-summary>
			</section>
			<section class="modal-card-body" v-if="currentTab === 'myAddress'">
				<div class="field">
					<label class="label" v-translate>Name</label>
					<div class="control">
						<input class="input" type="text" :placeholder="placeholders.name" autocomplete="name"
						 required v-model="userInfoName" />
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label class="checkbox">
							<input type="checkbox" v-model="isShowingVatInput" />
							<small><translate>I have a VAT number</translate></small>
						</label>
					</div>
				</div>
				<div class="field" v-if="isShowingVatInput">
					<label class="label" v-translate>VAT number</label>
					<div class="control has-icons-right">
						<input class="input" type="text" :placeholder="placeholders.vatNumber"
						 @blur="validate" v-model="userInfoVatNumber" :class="{ 'is-success': isValidVatNumber === true, 'is-danger': isValidVatNumber === false }" />
						<span class="icon is-small is-right" v-if="isValidVatNumber === true">
							<i class="fa fa-check"></i>
						</span>
					</div>
					<p class="help is-danger" v-if="isValidVatNumber === false" v-translate>This VAT number is invalid</p>
					<p class="help" v-if="isValidatingVat" v-translate>Checking VAT number...</p>
					<p class="help is-success" v-if="isValidVatNumber && !isValidatingVat">{{ vatValidationInfo }}</p>
				</div>
				<div class="field">
					<label class="label" v-translate>Email</label>
					<div class="control has-icons-right">
						<input class="input" type="email" :placeholder="placeholders.email"
						 @blur="validateEmail" autocomplete="email" v-model="userInfoEmail" required
						:class="{ 'is-success': isValidEmail === true, 'is-danger': isValidEmail === false }" />
						<span class="icon is-small is-right" v-if="isValidEmail === true">
							<i class="fa fa-check"></i>
						</span>
					</div>
					<p class="help is-danger" v-if="isValidEmail === false" v-translate>This email address is invalid</p>
				</div>
				<div class="field">
					<label class="label" v-translate>Phone number</label>
					<div class="control has-icons-right">
						<input class="input" type="tel" :placeholder="placeholders.phone" autocomplete="tel" v-model="userInfoPhone" required
						 @blur="validatePhone" :class="{ 'is-success': isValidPhone === true, 'is-danger': isValidPhone === false }" />
						<span class="icon is-small is-right" v-if="isValidPhone === true">
							<i class="fa fa-check"></i>
						</span>
					</div>
					<p class="help is-danger" v-if="isValidPhone === false" v-translate>This phone number is invalid</p>
				</div>
				<div class="field">
					<label class="label" v-translate>Shipping Address</label>
					<div class="control">
						<input class="input" type="text" :placeholder="placeholders.street" autocomplete="shipping street-address"
						  v-model="userInfoShippingAddressStreet" required />
					</div>
				</div>
				<div class="field is-grouped">
					<div class="control">
						<input class="input" type="text" :placeholder="placeholders.postalCode" autocomplete="shipping postal-code"
						 v-model="userInfoShippingAddressPostalCode" required />
					</div>
					<div class="control">
						<input class="input" type="text" :placeholder="placeholders.city" autocomplete="shipping address-level2"
						 v-model="userInfoShippingAddressCity" required />
					</div>
				</div>
				<div class="field">
					<div class="control is-expanded">
						<div class="select is-fullwidth">
							<select v-model="userInfoShippingAddressCountryCode">
								<option :selected="country.code === 'BE'" :value="country.code" v-for="country in countries"
								 :key="country.code" autocomplete="shipping country" required>{{ country.name }}</option>
							</select>
						</div>
					</div>
				</div>
				<div class="billing-address" v-if="!isBillingSameAsShipping">
					<div class="field">
						<label class="label" v-translate>Billing Address</label>
						<div class="control">
							<input class="input" type="text" :placeholder="placeholders.street"
							 autocomplete="billing street-address" v-model="userInfoBillingAddressStreet" required />
						</div>
					</div>
					<div class="field is-grouped">
						<div class="control">
							<input class="input" type="text" :placeholder="placeholders.postalCode" autocomplete="billing postal-code"
							 v-model="userInfoBillingAddressPostalCode" required />
						</div>
						<div class="control">
							<input class="input" type="text" :placeholder="placeholders.city" autocomplete="billing address-level2"
							 v-model="userInfoBillingAddressCity" required />
						</div>
					</div>
					<div class="field">
						<div class="control is-expanded">
							<div class="select is-fullwidth">
								<select v-model="userInfoBillingAddressCountryCode">
									<option :selected="country.code === 'BE'" :value="country.code" v-for="country in countries"
									 :key="country.code" autocomplete="billing country" required>{{ country.name }}</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<div class="field">
					<div class="control">
						<label class="checkbox">
							<input type="checkbox" v-model="isBillingSameAsShipping" />
							<translate>Billing and shipping address are the same</translate>
						</label>
					</div>
				</div>
			</section>
			<section class="modal-card-body" v-if="currentTab === 'shippingMethod'">
				<article v-for="rate in shippingRates" :key="rate.id" class="media">
					<div class="media-content">
						<div class="content">
							<input type="radio" :id="`rate-${rate.id}`" :value="rate" v-model="userInfoShippingMethod" />
							<label :for="`rate-${rate.id}`">{{ rate.description }}</label>
						</div>
					</div>
					<div class="media-right">
						<p>€ {{ rate.cost }}</p>
					</div>
				</article>
			</section>
			<footer class="modal-card-foot">
				<button class="button" @click="closeCart" v-translate>Close</button>
				<button class="button is-primary" :class="{ 'is-loading': isPlacingOrder }" :disabled="!canDoNextStep || isPlacingOrder" @click="nextStep">
					<translate>Next step</translate>
					&nbsp;&rarr;
				</button>
			</footer>
		</div>
		<button class="modal-close is-large" aria-label="close" @click="closeCart"></button>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import { roundTo, cartTotals, validateEmail, validatePhone } from './utils';
	import countries from './countries';
	import CartItem from './CartItem.vue';
	import CartSummary from './CartSummary.vue';

	const and = (p, c) => p && c;

	export default {
		components: { CartItem, CartSummary },
		data() {
			return {
				currentTab: 'myCart',
				countries,
				isBillingSameAsShipping: true,
				isShowingVatInput: false,
				isValidVatNumber: null,
				isValidatingVat: false,
				isPlacingOrder: false,
				vatValidationInfo: '',
				isValidEmail: null,
				isValidPhone: null,
				shippingRates: [],
				placeholders: {
					name: this.$gettext('e.g. Alex Smith'),
					email: this.$gettext('e.g. alex.smith@gmail.com'),
					vatNumber: this.$gettext('e.g. BE 0912 345 678'),
					street: this.$gettext('Street and house number'),
					postalCode: this.$gettext('Postal Code'),
					city: this.$gettext('City'),
				}
			};
		},
		computed: {
			...mapState({
				isCartOpen: state => state.isCartOpen,
				products: state => state.userInfo.cartProducts,
				userInfo: state => state.userInfo,
			}),
			totalIncl() {
				if (this.userInfo.shippingMethod) return roundTo(cartTotals(this.products).total + this.userInfo.shippingMethod.cost, 2);
				return roundTo(cartTotals(this.products).total, 2);
			},
			vat() {
				if (this.userInfo.shippingMethod) return roundTo(cartTotals(this.products).vat + (this.userInfo.shippingMethod.cost / 1.21), 2);
				return roundTo(cartTotals(this.products).vat, 2);
			},
			totalExcl() {
				return roundTo(this.totalIncl - this.vat, 2);
			},
			hasShippingAddressCountry() {
				return this.userInfo.shippingAddress.countryCode !== '';
			},
			hasAllRequiredFilledIn() {
				const addressFields = ['street', 'postalCode', 'city', 'countryCode'];
				return this.products.length > 0 && this.userInfo.name !== '' && (this.userInfo.email !== '' || this.userInfo.phone !== '') &&
					addressFields.map(af => this.userInfo.shippingAddress[af] !== '').reduce(and, true) &&
					addressFields.map(af => this.userInfo.billingAddress[af] !== '').reduce(and, true);
			},
			canDoNextStep() {
				if (this.currentTab === 'myCart' && this.products.length === 0) return false;
				if (this.currentTab === 'myAddress' && (!this.hasAllRequiredFilledIn || this.products.length === 0)) return false;
				if (this.currentTab === 'shippingMethod' && !this.canOrder) return false;
				return true;
			},
			canOrder() {
				return this.hasAllRequiredFilledIn && this.userInfo.shippingMethod && this.products.length > 0;
			},
			userInfoName: {
				get() {
					return this.userInfo.name;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_NAME', value);
				}
			},
			userInfoEmail: {
				get() {
					return this.userInfo.email;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_EMAIL', value);
				}
			},
			userInfoPhone: {
				get() {
					return this.userInfo.phone;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_PHONE', value);
				}
			},
			userInfoVatNumber: {
				get() {
					return this.userInfo.vatNumber;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_VAT_NUMBER', value);
				}
			},
			userInfoShippingMethod: {
				get() {
					return this.userInfo.shippingMethod;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_SHIPPING_METHOD', value);
				}
			},
			userInfoBillingAddressStreet: {
				get() {
					return this.userInfo.billingAddress.street;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_BILLING_ADDRESS_STREET', value);
				}
			},
			userInfoBillingAddressPostalCode: {
				get() {
					return this.userInfo.billingAddress.postalCode;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_BILLING_ADDRESS_POSTAL_CODE', value);
				}
			},
			userInfoBillingAddressCity: {
				get() {
					return this.userInfo.billingAddress.city;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_BILLING_ADDRESS_CITY', value);
				}
			},
			userInfoBillingAddressCountryCode: {
				get() {
					return this.userInfo.billingAddress.countryCode;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_BILLING_ADDRESS_COUNTRY_CODE', value);
				}
			},
			userInfoShippingAddressStreet: {
				get() {
					return this.userInfo.shippingAddress.street;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_SHIPPING_ADDRESS_STREET', value);
					if (this.isBillingSameAsShipping) this.$store.commit('UPDATE_USER_BILLING_ADDRESS_STREET', value);
				}
			},
			userInfoShippingAddressPostalCode: {
				get() {
					return this.userInfo.shippingAddress.postalCode;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_SHIPPING_ADDRESS_POSTAL_CODE', value);
					if (this.isBillingSameAsShipping) this.$store.commit('UPDATE_USER_BILLING_ADDRESS_POSTAL_CODE', value);
				}
			},
			userInfoShippingAddressCity: {
				get() {
					return this.userInfo.shippingAddress.city;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_SHIPPING_ADDRESS_CITY', value);
					if (this.isBillingSameAsShipping) this.$store.commit('UPDATE_USER_BILLING_ADDRESS_CITY', value);
				}
			},
			userInfoShippingAddressCountryCode: {
				get() {
					return this.userInfo.shippingAddress.countryCode;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_SHIPPING_ADDRESS_COUNTRY_CODE', value);
					if (this.isBillingSameAsShipping) this.$store.commit('UPDATE_USER_BILLING_ADDRESS_COUNTRY_CODE', value);
				}
			},
		},
		methods: {
			...mapActions({
				sendCart: 'SEND_CART',
				openCart: 'OPEN_CART',
				closeCart: 'CLOSE_CART',
				validateVat: 'VALIDATE_VAT',
				getShippingMethods: 'GET_SHIPPING_METHODS',
			}),
			order() {
				this.isPlacingOrder = true;
				this.sendCart().then(
					(url) => {
						this.isPlacingOrder = false;
						console.log('url', url);
						console.log('Now go to pay page');
						window.location.href = url;
					},
					() => {
						this.isPlacingOrder = false;
						console.log('Now go to error page');
					},
				);
			},
			setCurrentTab(tab) {
				console.log('tab', tab);
				if (tab === 'myAddress' && this.products.length === 0) return;
				if (tab === 'shippingMethod' && !this.hasAllRequiredFilledIn) return;
				if (tab === 'payment' && !this.canOrder) return;
				if (this.products.length === 0) tab = 'myCart';
				this.currentTab = tab;
				this.checkTabReqs();
			},
			checkTabReqs() {
				if (this.currentTab === 'shippingMethod') {
					if (this.isShowingVatInput === false) this.$store.commit('UPDATE_USER_VAT_NUMBER', '');
					this.getShippingMethods().then((result) => {
						if (result && result.rates) this.shippingRates = result.rates;
					});
				}
				if (this.currentTab === 'payment') {
					 this.order();
				}
			},
			nextStep() {
				if (this.currentTab === 'myCart') this.setCurrentTab('myAddress');
				else if (this.currentTab === 'myAddress') this.setCurrentTab('shippingMethod');
				else if (this.currentTab === 'shippingMethod' && this.userInfo.shippingMethod && this.hasAllRequiredFilledIn) this.setCurrentTab('payment');
			},
			validate() {
				const vatNumber = this.userInfo.vatNumber.substr(2);
				if (vatNumber.length > 0) {
					this.isValidVatNumber = null;
					this.isValidatingVat = true;
					this.vatValidationInfo = '';
					this.validateVat().then((result) => {
						this.isValidatingVat = false;
						if (result.valid) {
							this.isValidVatNumber = true;
							this.vatValidationInfo = result.name;
						} else {
							this.isValidVatNumber = false;
						}
					}).catch((err) => {
						this.isValidatingVat = false;
						console.error(err);
						this.isValidVatNumber = null;
					});
				} else {
					this.isValidatingVat = false;
					this.isValidVatNumber = null;
				}
			},
			validateEmail() {
				if (this.userInfo.email) this.isValidEmail = validateEmail(this.userInfo.email);
			},
			validatePhone() {
				if (this.userInfo.phone) this.isValidPhone = validatePhone(this.userInfo.phone);
			},
		},
	};
</script>

<style>
	.modal-card-head,
	.modal-card-foot {
		background-color: white;
		border: 0;
	}

	.modal-card-foot {
		justify-content: flex-end;
	}

	.media.total {
		border-top: 1px solid rgba(219, 219, 219, 0.5) !important;
	}
	.is-disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style><style lang="scss" scoped>
	.modal-card-head {
		padding: 0 0 1em 0;
		.tabs {
			width: 100%;
		}
	}
</style>

