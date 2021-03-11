import Vue from 'vue';
import initialState from './initialState';

function computeMax(values) {
	const value = values && values[1] ? values[1] : 1;
	const log = Math.floor(Math.log10(value));
	const keep = value - (value % 10 ** log);
	if (log === 1) return keep + 10;
	if (value % 10 ** log) {
		// value % 10 ** log / 10 ** log
		const rounded = Math.ceil(value % 10 ** log / 10 ** (log - 1)) * 10 ** (log - 1);
		console.log('rounded', rounded);
		return keep + rounded;
	}
	return value;
}

function computeMin(values) {
	const value = values && values[0] ? values[0] : 0;
	if (value < 100) return 0;
	const log = Math.floor(Math.log10(value));
	if (value % 10 ** log) {
		return value - (value % 10 ** log);
	}
	return value;
}

export default {
	SET_FILTERS: (state, {
		list
	}) => {
		list.forEach((filter) => {
			if (filter.type === 'enum' || filter.type === 'array') {
				filter.values = filter.values.map(value => ({
					value,
					checked: false,
				}));
			}
			if (filter.type === 'number') {
				filter.min = computeMin(filter.values);
				filter.max = computeMax(filter.values);
				filter.values = [filter.min, filter.max];
			}
		});
		state.productfilters = list;
	},

	SET_SORTERS: (state, { list	}) => {
		state.productsorters = list;
	},

	UPDATE_FILTERS: (state, {
		list
	}) => {
		list.forEach((filter) => {
			console.log('UPDATE_FILTERS', filter);
			if (filter.type === 'number') {
				filter.min = computeMin(filter.values);
				filter.max = computeMax(filter.values);
				filter.values = [filter.min, filter.max];
			}
			state.productfilters.splice(state.productfilters.findIndex(f => f.attr === filter.attr), 1, filter);
		});
	},

	SET_AMOUNTS: (state, {
		list
	}) => {
		list.forEach((amount) => {
			const filter = state.productfilters.find(pf => pf.attr === amount.attr);
			const value = filter.values.find(v => v.value === amount.value);
			if (value) Vue.set(value, 'amount', amount.amount);
		});
	},

	ADD_PRODUCTS: (state, {
		list
	}) => {
		state.products.push(...list);
	},
	DELETE_PRODUCTS: (state) => {
		state.products.splice(0, state.products.length);
	},
	DELETE_RECENT: (state) => {
		state.userInfo.recentProducts.splice(0, state.userInfo.recentProducts.length);
	},
	APPLY_FILTER: (state, {
		filter
	}) => {
		console.log('APPLY_FILTER filter', filter);
		const foundInProductFilters = state.productfilters.find(f => f.attr === filter.attr);
		if (foundInProductFilters) {
			console.log('foundInProductFilters', foundInProductFilters);
			if (filter.type === 'range' && filter.values) {
				foundInProductFilters.values.splice(0, foundInProductFilters.values.length);
				foundInProductFilters.values.push(...filter.values);
			}
			if (filter.type === 'checkbox' && filter.value) {
				(foundInProductFilters.values.find(f => f.value === filter.value)).checked = filter.checked;
			}
			if (filter.type === 'search') {
				Vue.set(foundInProductFilters, 'value', filter.value);
			}
		}
	},
	DELETE_FILTERS: (state) => {
		state.productfilters.forEach((f) => {
			if (f.type === 'enum' || f.type === 'array') {
				f.values.forEach((v) => {
					v.checked = false;
				});
			}
			if (f.type === 'number') {
				f.values = [f.min, f.max];
			}
			if (f.type === 'search') {
				f.value = '';
			}
		});
	},
	DELETE_FILTER: (state, filter) => {
		const f = state.productfilters.find(fil => fil.attr === filter.attr);
		if (f.type === 'enum' || f.type === 'array') {
			f.values.forEach((v) => {
				v.checked = false;
			});
		}
		if (f.type === 'number') {
			f.values = [f.min, f.max];
		}
		if (f.type === 'search') {
			f.value = '';
		}
	},
	SET_CURRENT_PRODUCT: (state, product) => {
		state.currentProduct = product;
	},

	SET_IS_EMPTY: (state, value) => {
		Vue.set(state, 'isEmpty', value);
	},

	SET_IS_CHAT_POSSIBLE: (state, value) => {
		Vue.set(state, 'isChatPossible', value);
	},

	ADD_TO_RECENT: (state, product) => {
		const foundIndex = state.userInfo.recentProducts.findIndex(p => p.id === product.id);
		if (foundIndex !== -1) {
			// bring to the front
			state.userInfo.recentProducts.splice(foundIndex, 1);
			state.userInfo.recentProducts.splice(0, 0, product);
			state.userInfo.recentProducts = state.userInfo.recentProducts.slice(0, 12);
		} else {
			state.userInfo.recentProducts.splice(0, 0, product);
			state.userInfo.recentProducts = state.userInfo.recentProducts.slice(0, 12);
		}
	},
	ADD_TO_CART: (state, product) => {
		const foundIndex = state.userInfo.cartProducts.findIndex(p => p.id === product.id);
		if (foundIndex !== -1 && product.custommade !== 'yes') {
			// add one
			const cartProduct = JSON.parse(JSON.stringify(state.userInfo.cartProducts.find(p => p.id === product.id)));
			if (cartProduct.amount < cartProduct.stock) {
				cartProduct.amount = cartProduct.amount ? cartProduct.amount + 1 : 2;
			} else {
				cartProduct.amount = cartProduct.amount || 1;
			}
			state.userInfo.cartProducts.splice(foundIndex, 1, cartProduct);
		} else {
			const cartProduct = Object.assign({
				amount: 1,
				customLength: state.userInfo.rugSize.length,
				customWidth: state.userInfo.rugSize.width,
			}, product);
			state.userInfo.cartProducts.splice(0, 0, cartProduct);
		}
	},
	ADD_TO_FAVS: (state, product) => {
		state.userInfo.favoriteProducts.splice(0, 0, product);
	},
	REMOVE_FROM_FAVS: (state, product) => {
		const foundIndex = state.userInfo.favoriteProducts.findIndex(p => p.id === product.id);
		if (foundIndex !== -1) state.userInfo.favoriteProducts.splice(foundIndex, 1);
	},
	REMOVE_FROM_CART: (state, product) => {
		const foundIndex = state.userInfo.cartProducts.findIndex(p => p.id === product.id);
		if (foundIndex !== -1) state.userInfo.cartProducts.splice(foundIndex, 1);
	},
	REMOVE_ONE_FROM_CART: (state, product) => {
		const foundIndex = state.userInfo.cartProducts.findIndex(p => p.id === product.id);
		if (foundIndex !== -1) {
			const cartProduct = JSON.parse(JSON.stringify(state.userInfo.cartProducts.find(p => p.id === product.id)));
			cartProduct.amount = cartProduct.amount ? cartProduct.amount - 1 : 1;
			state.userInfo.cartProducts.splice(foundIndex, 1, cartProduct);
		}
	},

	COPY_CART_TO_LAST_ORDERED: (state) => {
		if (state.userInfo.cartProducts.length > 0) {
			state.userInfo.lastOrderedProducts = [...state.userInfo.cartProducts];
			state.userInfo.cartProducts = [];
		}
	},

	UPDATE_USER_NAME: (state, value) => {
		Vue.set(state.userInfo, 'name', value);
	},
	UPDATE_USER_CONTACT: (state, value) => {
		Vue.set(state.userInfo, 'contact', value);
	},
	UPDATE_USER_EMAIL: (state, value) => {
		Vue.set(state.userInfo, 'email', value);
	},
	UPDATE_USER_PHONE: (state, value) => {
		Vue.set(state.userInfo, 'phone', value);
	},
	UPDATE_USER_VAT_NUMBER: (state, value) => {
		Vue.set(state.userInfo, 'vatNumber', value);
	},
	UPDATE_USER_SHIPPING_METHOD: (state, value) => {
		Vue.set(state.userInfo, 'shippingMethod', value);
	},
	UPDATE_USER_BILLING_ADDRESS_STREET: (state, value) => {
		Vue.set(state.userInfo.billingAddress, 'street', value);
	},
	UPDATE_USER_BILLING_ADDRESS_POSTAL_CODE: (state, value) => {
		Vue.set(state.userInfo.billingAddress, 'postalCode', value);
	},
	UPDATE_USER_BILLING_ADDRESS_CITY: (state, value) => {
		Vue.set(state.userInfo.billingAddress, 'city', value);
	},
	UPDATE_USER_BILLING_ADDRESS_COUNTRY_CODE: (state, value) => {
		Vue.set(state.userInfo.billingAddress, 'countryCode', value);
	},
	UPDATE_USER_SHIPPING_ADDRESS_STREET: (state, value) => {
		Vue.set(state.userInfo.shippingAddress, 'street', value);
	},
	UPDATE_USER_SHIPPING_ADDRESS_POSTAL_CODE: (state, value) => {
		Vue.set(state.userInfo.shippingAddress, 'postalCode', value);
	},
	UPDATE_USER_SHIPPING_ADDRESS_CITY: (state, value) => {
		Vue.set(state.userInfo.shippingAddress, 'city', value);
	},
	UPDATE_USER_SHIPPING_ADDRESS_COUNTRY_CODE: (state, value) => {
		Vue.set(state.userInfo.shippingAddress, 'countryCode', value);
	},
	UPDATE_USER_RUG_LENGTH: (state, value) => {
		Vue.set(state.userInfo.rugSize, 'length', value);
		Vue.set(state.userInfo.rugSize, 'hasUpdated', true);
	},
	UPDATE_USER_RUG_WIDTH: (state, value) => {
		Vue.set(state.userInfo.rugSize, 'width', value);
		Vue.set(state.userInfo.rugSize, 'hasUpdated', true);
	},
	UPDATE_FAVORITES_OPTIONS: (state, value) => {
		state.userInfo.favoritesOptions = value;
	},
	LOGOUT: (state) => {
		Vue.set(state, 'userInfo', initialState.userInfo);
	},
	SET_BUSY: (state) => {
		Vue.set(state, 'isBusy', true);
	},
	UNSET_BUSY: (state) => {
		Vue.set(state, 'isBusy', false);
	},
	OPEN_CART: (state) => {
		Vue.set(state, 'isCartOpen', true);
	},
	CLOSE_CART: (state) => {
		Vue.set(state, 'isCartOpen', false);
	},

	SET_SERVER_ERROR: (state) => {
		Vue.set(state, 'isServerError', true);
	},
	UNSET_SERVER_ERROR: (state) => {
		Vue.set(state, 'isServerError', false);
	},

	SET_END_REACHED: (state) => {
		Vue.set(state, 'isEndReached', true);
	},
	UNSET_END_REACHED: (state) => {
		Vue.set(state, 'isEndReached', false);
	},

	SET_CART_READY: (state) => {
		Vue.set(state, 'isCartReady', true);
	},

	SET_HAS_REACTED_TO_POPUP: (state) => {
		Vue.set(state.userInfo, 'hasReactedToPopup', true);
	},

	SET_HOMEPAGE_SCROLL: (state, value) => {
		console.log('SET_HOMEPAGE_SCROLL', value);
		Vue.set(state, 'homepageScroll', value);
	},

	SET_SENT_FAVORITES: (state, list) => {
		console.log('SET_SENT_FAVORITES list', list);
		Vue.set(state.userInfo, 'sentFavorites', list);
	},

	SET_INITIAL_STATE: (state) => {
		window.localStorage.clear();
		Object.keys(initialState).forEach((key) => {
			Vue.set(state, key, initialState[key]);
		});
	},

	SET_ACTIVE_TAB: (state, tab) => {
		Vue.set(state.sidebar, 'activeTab', tab);
	},

	SET_SIDEBAR_OPEN: (state, isOpen) => {
		Vue.set(state.sidebar, 'isOpen', isOpen);
	},

	SET_CART_PRODUCTS: (state, list) => {
		state.userInfo.cartProducts = list;
	},

	SET_TOUR_DONE: (state) => {
		state.filterSettings.isTourDone = true;
	},

	SET_FILTER_OPEN: (state, value) => {
		Vue.set(state.filterSettings, 'isOpen', value);
	},

	SET_FAVORITES_MODAL_OPEN: (state, value) => {
		Vue.set(state, 'isFavoritesModalOpen', value);
	},

	SET_CURRENT_SORT: (state, value) => {
		state.currentSort = value;
	},
};
