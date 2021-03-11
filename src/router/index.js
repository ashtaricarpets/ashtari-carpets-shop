import VueRouter from 'vue-router';
import Vue from 'vue';
import Product from '../components/Product.vue';
import Thanks from '../components/Thanks.vue';
import Home from '../components/Home.vue';
import OtherSitePage from '../components/OtherSitePage.vue';
// import SignUpPage from '../components/SignUpPage.vue';

const TextPage = () => import('../components/TextPage.vue');

Vue.use(VueRouter);

export default new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/products/:id',
			component: Product,
			name: 'ProductDetails',
		},
		{
			path: '/products',
			component: Home,
		},
		{
			path: '/info/:text',
			component: TextPage,
			name: 'Info',
		},
		{
			path: '/info',
			component: Home,
		},
		{
			path: '/thanks',
			component: Thanks,
		},
		{
			path: '/external-info/:text',
			component: OtherSitePage,
			name: 'ExternalInfo',
		},
		{
			path: '/external-info',
			component: Home,
		},
		{
			path: '/',
			component: Home,
			name: 'home',
		},
		// {
		// 	path: '/',
		// 	component: SignUpPage,
		// 	name: 'signup',
		// },
		{
			path: '*',
			component: Home,
		},
	],
	base: '',
	// base: (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV === 'production') ? '' : '/ashtari-shop/frontend2/dist/',
});
