import axios from 'axios';
import router from '../router';
import config from '../config';

const { server, shop } = config;
const limit = 12;

function sortToQuery(currentSort) {
	if (!currentSort || currentSort === 'null|null') return undefined;
	return `?sort=${currentSort}`;
}

function filtersToQuery(filters) {
	const activeFilters = filters
		.map(f => {
			if (f.type === 'number') {
				return f.values[0] !== f.min || f.values[1] !== f.max
					? f.values.map((v, i) => [f.attr, '[', i, ']=', encodeURIComponent(v)].join('')).join('&')
					: undefined;
			}
			if (f.type === 'enum' || f.type === 'array') {
				return f.values.filter(v => v.checked).length > 0
					? f.values
							.filter(v => v.checked)
							.map((v, i) => [f.attr, '[', i, ']=', encodeURIComponent(v.value)].join(''))
							.join('&')
					: undefined;
			}
			if (f.type === 'search' && f.value) {
				return `${[f.attr]}=${encodeURIComponent(f.value)}`;
			}
			return undefined;
		})
		.filter(n => n);
	return activeFilters.length ? activeFilters.join('&') : '';
}

function findActiveFilters(filters) {
	return filters.filter(f => {
		if (f.type === 'number') {
			return f.values[0] !== f.min || f.values[1] !== f.max;
		}
		if (f.type === 'enum' || f.type === 'array') {
			return f.values.filter(v => v.checked).length > 0;
		}
		if (f.type === 'search' && f.value) {
			return true;
		}
		return false;
	});
}

function activeFiltersAsObject(filters) {
	const active = findActiveFilters(filters);
	const returnValue = {};
	active.forEach(f => {
		if (f.type === 'number') returnValue[f.attr] = f.values;
		if (f.type === 'enum' || f.type === 'array')
			returnValue[f.attr] = f.values.filter(v => v.checked).map(v => v.value);
		if (f.type === 'search') returnValue.search = f.value;
	});
	return returnValue;
}

function getProduct(id) {
	return axios.get([shop, 'data', id].join('/'));
}

function getProducts(state) {
	return axios.get(
		[shop, 'data', state.products.length, limit].join('/') +
			(sortToQuery(state.currentSort) ? `${sortToQuery(state.currentSort)}&` : '?') +
			filtersToQuery(state.productfilters),
	);
}

function getAmounts(state) {
	return axios.get(`${[shop, 'amounts'].join('/')}?${filtersToQuery(state.productfilters)}`);
}

function getMinMax(state) {
	return axios.get(`${[shop, 'minmax'].join('/')}?${filtersToQuery(state.productfilters)}`);
}

function sendFavorites(state) {
	return axios.post([shop, 'favorites'].join('/'), {
		favorites: state.userInfo.favoriteProducts.map(p => p.id).join(','),
		options: state.userInfo.favoritesOptions.join(','),
		name: state.userInfo.name,
		contact: state.userInfo.contact,
	});
}

function sendCart(state) {
	return axios.post([shop, 'order'].join('/'), {
		userInfo: state.userInfo,
	});
}

function validateVat(state) {
	const { vatNumber } = state.userInfo;
	return axios.get([server, 'validate-vat', vatNumber].join('/'));
}

function getShippingMethods(state) {
	return axios.post([shop, 'shipping-rates'].join('/'), {
		userInfo: state.userInfo,
	});
}

export default {
	LOAD_FILTERS: ({ commit, dispatch }) =>
		new Promise((resolve, reject) => {
			axios.get([shop, 'filters'].join('/')).then(
				response => {
					commit('SET_FILTERS', {
						list: response.data,
					});
					dispatch('SET_AMOUNTS');
					resolve();
				},
				err => {
					console.error(err);
					reject(err);
				},
			);
		}),

	LOAD_SORTERS: ({ commit }) =>
		new Promise((resolve, reject) => {
			axios.get([shop, 'sorters'].join('/')).then(
				response => {
					commit('SET_SORTERS', {
						list: response.data,
					});
					resolve();
				},
				err => {
					console.error(err);
					reject(err);
				},
			);
		}),

	UPDATE_NUMBER_FILTERS: ({ commit, state }) => {
		getMinMax(state).then(
			response => {
				commit('UPDATE_FILTERS', {
					list: response.data,
				});
			},
			err => {
				console.error(err);
			},
		);
	},

	SET_AMOUNTS: ({ commit, state }) => {
		getAmounts(state).then(
			response => {
				commit('SET_AMOUNTS', {
					list: response.data,
				});
			},
			err => {
				console.error(err);
			},
		);
	},

	VALIDATE_VAT: ({ state }) =>
		new Promise((resolve, reject) => {
			validateVat(state)
				.then(response => {
					if (response && response.data) {
						resolve(response.data);
					} else {
						reject(response);
					}
				})
				.catch(err => {
					reject(err);
				});
		}),

	GET_SHIPPING_METHODS: ({ state }) =>
		new Promise((resolve, reject) => {
			getShippingMethods(state)
				.then(response => {
					if (response && response.data) {
						resolve(response.data);
					} else {
						reject(response);
					}
				})
				.catch(err => {
					reject(err);
				});
		}),

	DELETE_PRODUCTS: ({ commit }) => {
		commit('DELETE_PRODUCTS');
	},
	DELETE_RECENT: ({ commit }) => {
		commit('DELETE_RECENT');
	},

	ADD_PRODUCTS: ({ commit, dispatch, state }) =>
		new Promise((resolve, reject) => {
			commit('SET_BUSY');
			getProducts(state).then(
				response => {
					commit('UNSET_SERVER_ERROR');
					if (response.data.length < limit) {
						commit('SET_END_REACHED');
					} else {
						commit('UNSET_BUSY');
					}
					commit('ADD_PRODUCTS', {
						list: response.data,
					});
					resolve(response.data.length);
				},
				err => {
					console.error(err);
					commit('SET_BUSY');
					commit('SET_END_REACHED');
					commit('SET_SERVER_ERROR');
					setTimeout(() => {
						commit('UNSET_SERVER_ERROR');
						commit('UNSET_BUSY');
						dispatch('LOAD_FILTERS');
					}, 5000);
					reject(err);
				},
			);
		}),

	APPLY_FILTER: ({ commit, state, dispatch }, filter) => {
		dispatch('RESET_HOMEPAGE_SCROLL');
		commit('UNSET_BUSY');
		commit('UNSET_END_REACHED');
		commit('APPLY_FILTER', {
			filter,
		});
		router.push({
			query: activeFiltersAsObject(state.productfilters),
		});
		dispatch('SET_AMOUNTS');
		dispatch('UPDATE_NUMBER_FILTERS');
		commit('DELETE_PRODUCTS');
		dispatch('ADD_PRODUCTS');
	},

	DELETE_FILTERS: ({ commit }) => {
		commit('UNSET_BUSY');
		commit('UNSET_END_REACHED');
		commit('DELETE_FILTERS');
	},

	DELETE_FILTER: ({ commit, dispatch }, filter) => {
		commit('UNSET_BUSY');
		commit('UNSET_END_REACHED');
		commit('DELETE_FILTER', filter);
		dispatch('SET_AMOUNTS');
		dispatch('UPDATE_NUMBER_FILTERS');
		commit('DELETE_PRODUCTS');
		dispatch('ADD_PRODUCTS');
	},

	SET_CURRENT_PRODUCT: ({ commit, dispatch, state }, id) =>
		new Promise((resolve, reject) => {
			const found = state.products.find(p => p.id === id);
			if (found) {
				commit('SET_CURRENT_PRODUCT', found);
				dispatch('SET_ACTIVE_TAB', 'recent');
				commit('ADD_TO_RECENT', found);
				resolve(found);
			} else {
				getProduct(id).then(
					response => {
						commit('SET_CURRENT_PRODUCT', response.data[0]);
						dispatch('SET_ACTIVE_TAB', 'recent');
						commit('ADD_TO_RECENT', response.data[0]);
						resolve(found);
					},
					err => {
						console.error(err);
						reject(err);
					},
				);
			}
		}),

	ADD_TO_FAVS: ({ commit, dispatch, state }, product) => {
		const found = state.userInfo.favoriteProducts.find(p => p.id === product.id);
		dispatch('SET_ACTIVE_TAB', 'favorite');
		if (!found) {
			commit('ADD_TO_FAVS', product);
		}
	},

	REMOVE_FROM_FAVS: ({ commit, dispatch }, product) => {
		dispatch('SET_ACTIVE_TAB', 'favorite');
		commit('REMOVE_FROM_FAVS', product);
	},

	ADD_TO_CART: ({ commit, dispatch }, product) => {
		dispatch('SET_ACTIVE_TAB', 'cart');
		commit('ADD_TO_CART', product);
		dispatch('OPEN_CART');
	},

	REMOVE_ONE_FROM_CART: ({ commit, dispatch }, product) => {
		dispatch('SET_ACTIVE_TAB', 'cart');
		if (product.amount === 1) {
			commit('REMOVE_FROM_CART', product);
		} else {
			commit('REMOVE_ONE_FROM_CART', product);
		}
	},

	REMOVE_FROM_CART: ({ commit, dispatch }, product) => {
		dispatch('SET_ACTIVE_TAB', 'cart');
		commit('REMOVE_FROM_CART', product);
	},

	COPY_CART_TO_LAST_ORDERED: ({ commit }) => {
		commit('COPY_CART_TO_LAST_ORDERED');
	},

	UPDATE_USER_NAME: ({ commit }, value) => {
		commit('UPDATE_USER_NAME', value);
	},
	UPDATE_USER_CONTACT: ({ commit }, value) => {
		commit('UPDATE_USER_CONTACT', value);
	},
	UPDATE_USER_RUG_LENGTH: ({ commit }, value) => {
		commit('UPDATE_USER_RUG_LENGTH', value);
	},
	UPDATE_USER_RUG_WIDTH: ({ commit }, value) => {
		commit('UPDATE_USER_RUG_WIDTH', value);
	},

	UPDATE_FAVORITES_OPTIONS: ({ commit }, value) => {
		commit('UPDATE_FAVORITES_OPTIONS', value);
	},

	LOGOUT: ({ commit }) => {
		commit('LOGOUT');
	},
	SET_BUSY: ({ commit }) => {
		commit('SET_BUSY');
	},
	UNSET_BUSY: ({ commit }) => {
		commit('UNSET_BUSY');
	},
	OPEN_CART: ({ commit }) => {
		commit('OPEN_CART');
	},
	CLOSE_CART: ({ commit }) => {
		commit('CLOSE_CART');
	},
	SET_CART_READY: ({ commit }) => {
		commit('SET_CART_READY');
	},

	SET_FAVORITES_MODAL_OPEN: ({ commit }, value) => {
		commit('SET_FAVORITES_MODAL_OPEN', value);
	},

	REFRESH: ({ commit, dispatch }) => {
		commit('SET_INITIAL_STATE');
		dispatch('LOAD_FILTERS');
		dispatch('LOAD_SORTERS');
		dispatch('ADD_PRODUCTS');
		dispatch('RESET_HOMEPAGE_SCROLL');
	},

	SET_HAS_REACTED_TO_POPUP: ({ commit }) => {
		commit('SET_HAS_REACTED_TO_POPUP');
	},

	SET_IS_CHAT_POSSIBLE: ({ commit }, value) => {
		commit('SET_IS_CHAT_POSSIBLE', value);
	},

	CHECK_INITIAL_STATE: ({ commit, state, dispatch }) => {
		console.log('CHECK_INITIAL_STATE', state.isEmpty);
		if (state.isEmpty === undefined) {
			commit('SET_INITIAL_STATE');
		}
		if (state.isEmpty === true) {
			dispatch('LOAD_FILTERS');
			dispatch('LOAD_SORTERS');
			dispatch('ADD_PRODUCTS');
			commit('SET_IS_EMPTY', false);
		}
	},

	SEND_FAVORITES: ({ commit, state }) =>
		new Promise((resolve, reject) => {
			sendFavorites(state).then(
				response => {
					console.log('response', response);
					commit('SET_SENT_FAVORITES', response.data);
					resolve('ok');
				},
				err => {
					console.error(err);
					reject(err);
				},
			);
		}),

	SEND_BOOK: () =>
		new Promise(resolve => {
			resolve('ok');
		}),

	SEND_CART: ({ state }) =>
		new Promise((resolve, reject) => {
			sendCart(state).then(
				response => {
					console.log('response', response);
					resolve(response.data);
				},
				err => {
					console.error(err);
					reject(err);
				},
			);
		}),

	SET_HOMEPAGE_SCROLL: ({ commit }, value) => {
		commit('SET_HOMEPAGE_SCROLL', value);
	},
	RESET_HOMEPAGE_SCROLL: ({ commit }) => {
		commit('SET_HOMEPAGE_SCROLL', 0);
	},

	SET_ACTIVE_TAB: ({ commit }, tab) => {
		commit('SET_ACTIVE_TAB', tab);
	},
	SHOW_SIDEBAR: ({ commit }) => {
		commit('SET_SIDEBAR_OPEN', true);
	},
	HIDE_SIDEBAR: ({ commit }) => {
		commit('SET_SIDEBAR_OPEN', false);
	},

	SET_CART_PRODUCTS: ({ commit, dispatch }, list) => {
		dispatch('SET_ACTIVE_TAB', 'cart');
		commit('SET_CART_PRODUCTS', list);
	},

	SET_TOUR_DONE: ({ commit }) => {
		commit('SET_TOUR_DONE');
	},

	SET_FILTER_OPEN: ({ commit }, value) => {
		commit('SET_FILTER_OPEN', value);
	},

	SET_CURRENT_SORT: ({ commit, dispatch }, value) => {
		commit('SET_CURRENT_SORT', value);
		dispatch('RESET_HOMEPAGE_SCROLL');
		commit('UNSET_BUSY');
		commit('UNSET_END_REACHED');
		commit('DELETE_PRODUCTS');
		dispatch('ADD_PRODUCTS');
	},
};
