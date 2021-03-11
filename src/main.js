import Vue from 'vue';
import Meta from 'vue-meta';
import VueHead from 'vue-head';

import { sync } from 'vuex-router-sync';
import infiniteScroll from 'vue-infinite-scroll';
import Lazyload from 'vue-lazyload';
import injector from 'vue-inject';
import GetTextPlugin from 'vue-gettext';
import VueAnalytics from 'vue-analytics';
import Pace from 'pace-progress';

import translations from '../public/static/translations.json';

import App from './App.vue';
import router from './router';
import store from './store';
import filters from './filters';

import './services';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(GetTextPlugin, {
	availableLanguages: {
		nl_BE: 'nl',
		en_US: 'en',
	},
	defaultLanguage: 'nl_BE',
	languageVmMixin: {
		computed: {
			currentKebabCase() {
				return this.current.toLowerCase().replace('_', '-');
			},
		},
	},
	translations,
	silent: true,
});

Vue.use(Meta);
Vue.use(VueHead);
Vue.use(injector);

if (!window.__PRERENDER_INJECTED) {
	// eslint-disable-line
	Vue.use(Lazyload, {
		error: 'https://www.ashtaricarpets.com/img/logo.svg',
		loading: 'https://www.ashtaricarpets.com/img/logo.svg',
		observer: true,
		attempt: 1,
		listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'touchmove'],
	});

	Vue.use(VueAnalytics, {
		id: 'UA-91208216-2',
		router,
		ecommerce: {
			enabled: true,
			enhanced: true,
		},
	});
	Vue.use(infiniteScroll);
}

sync(store, router);

new Vue({
	store,
	router,
	filters,
	mounted() {
		Pace.start();
		Pace.on('hide', () => {
			document.dispatchEvent(new Event('app.rendered'));
		});
	},
	render: h => h(App),
}).$mount('#app');

// Snipcart.subscribe('cart.ready', updateCartList);
// Snipcart.subscribe('cart.opened', updateCartList);
// Snipcart.subscribe('cart.closed', updateCartList);
// Snipcart.subscribe('item.added', updateCartList);
// Snipcart.subscribe('item.updated', updateCartList);
// Snipcart.subscribe('item.removed', updateCartList);

// Snipcart.api.configure('credit_cards', [{
// 	type: 'visa',
// 	display: 'Visa'
// }, {
// 	type: 'mastercard',
// 	display: 'Mastercard'
// }, {
// 	type: 'maestro',
// 	display: 'Maestro'
// }, {
// 	type: 'amex',
// 	display: 'American Express'
// }]);

// function updateCartList() {
// 	mapProducts(Snipcart.api.items.all());
// }

// function mapProducts(items) {
// 	store.dispatch('SET_CART_PRODUCTS', items.map(itemToProduct));
// }

// function itemToProduct(item) {
// 	return {
// 		id: item.id,
// 		title: item.name,
// 		img: [item.image],
// 		price: item.totalPrice,
// 		description: item.description,
// 	};
// }
