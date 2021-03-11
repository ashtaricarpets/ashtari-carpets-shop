<template>
	<div class="main">
		<mobile-nav></mobile-nav>
		<div class="columns is-mobile is-gapless">
			<div class="column has-padding">
				<top-header class="is-hidden-touch"></top-header>
				<product-details></product-details>
				<recent-list></recent-list>
			</div>
			<div class="column is-hidden-touch is-narrow">
				<sidebar></sidebar>
			</div>
		</div>
		<product-structured-data></product-structured-data>
		<bottom-footer></bottom-footer>
	</div>
</template>

<script>
	import Sidebar from './../components/Sidebar.vue';
	import ProductDetails from './../components/ProductDetails.vue';
	import TopHeader from './../components/TopHeader.vue';
	import BottomFooter from './BottomFooter.vue';
	import RecentList from './RecentList.vue';
	import ProductStructuredData from './ProductStructuredData.vue';
	import MobileNav from './MobileNav.vue';

	export default {
		components: {
			Sidebar, ProductDetails, TopHeader, BottomFooter, RecentList, ProductStructuredData, MobileNav
		},
	};
</script>
