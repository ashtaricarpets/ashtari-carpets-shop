<template>
	<div class="main">
		<div class="columns is-gapless is-marginless">
			<div class="column">
				<refresh-button></refresh-button>
			</div>
		</div>
		<div class="columns is-gapless is-marginless">
			<div class="column is-narrow">
				<filter-list></filter-list>
			</div>
			<div class="column has-padding center-column">
				<banner></banner>
				<top-header></top-header>
				<p class="is-hidden-mobile">
					Ashtari is een <b>eigentijds tapijtenhuis</b> in Antwerpen.
				</p>
				<p class="is-hidden-mobile">
					Bij Ashtari zijn kwalitatief hoogstaande en ethisch verantwoorde tapijten en
					accessoires de norm.
					Alle producten binnen ons assortiment worden door ons team persoonlijk uitgezocht op
					basis van originaliteit, kwaliteit en ambachtelijkheid.
				</p>
				<hr class="is-hidden-touch" />
				<favorites-list class="is-hidden-touch"></favorites-list>
				<!-- <promo></promo> -->
				<div class="columns filters-and-sorters">
					<div class="column">
						<active-filter-warning></active-filter-warning>
					</div>
					<div class="column is-narrow">
						<sorters></sorters>
					</div>
				</div>
				<product-list></product-list>
			</div>
			<div class="column is-hidden-touch is-narrow">
				<sidebar></sidebar>
			</div>
		</div>
		<bottom-footer></bottom-footer>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue';
	import ProductList from './ProductList.vue';
	import FavoritesList from './FavoritesList.vue';
	import FilterList from './FilterList.vue';
	import TopHeader from './TopHeader.vue';
	import ActiveFilterWarning from './ActiveFilterWarning.vue';
	import Banner from './Banner.vue';
	import RefreshButton from './RefreshButton.vue';
	import BottomFooter from './BottomFooter.vue';
	import Sorters from './Sorters.vue';
	// import LanguageSelect from './LangagueSelect.vue';

	export default {
		components: {
			Banner, RefreshButton, Sidebar, ProductList, FavoritesList, FilterList, ActiveFilterWarning, TopHeader, BottomFooter, Sorters
		},
		metaInfo() {
			return {
				title: 'Ashtari Carpets Webshop',
			};
		},
		mounted() {
			if (this.$store.state.homepageScroll) {
				const self = this;
				setTimeout(() => {
					window.scrollTo(0, self.$store.state.homepageScroll);
				}, 1);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.columns.is-gapless > .center-column {
		margin-bottom: 6rem;
	}

	.filters-and-sorters {
		border: 1px solid rgba(10, 10, 10, 0.1);
		margin: 0 0 1rem;
	}
</style>
