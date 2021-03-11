<template>
	<div class="main-menu">
		<div class="links has-text-centered-touch has-text-right-desktop" v-if="!isSearchOpen">
			<router-link to="/secret" v-if="$route.name === 'ProductDetails' || $route.name === 'Info' || $route.name === 'ExternalInfo'">
				Home
			</router-link>
			<a href="https://www.ashtaricarpets.com/nl/" target="_blank">
				Nieuwsblog
			</a>
			<router-link to="/external-info/services+zichtservice">
				Thuispresentatie
			</router-link>
			<router-link to="/external-info/services+reinigen">
				Reinigen
			</router-link>
			<router-link to="/external-info/services+herstellen">
				Herstellen
			</router-link>
			<a href="https://www.ashtaricarpets.com/nl/contact/" target="_blank">
				Contact
			</a>
			<a @click="openSearch">
				<i class="fa fa-search"></i>
			</a>
		</div>
		<div class="search-container has-text-centered-touch has-text-right-desktop" v-if="isSearchOpen">
			<filter-search :productfilter="productfilter"></filter-search>
			<a @click="toggleSearch" class="close-button">
				<i class="fa fa-close"></i>
			</a>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import FilterSearch from './FilterSearch.vue';

	export default {
		components: {
			FilterSearch,
		},
		data() {
			return {
				isSearchOpen: false,
			};
		},
		computed: {
			...mapState(['productfilters']),
			productfilter() {
				return this.productfilters.find(filter => filter.type === 'search');
			}
		},
		methods: {
			...mapActions({
				setFilterOpen: 'SET_FILTER_OPEN',
			}),
			toggleSearch() {
				this.isSearchOpen = !this.isSearchOpen;
			},
			openSearch() {
				this.setFilterOpen(true);
				this.$router.push('/');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.main-menu {
		height: 100%;

		a {
			cursor: pointer;
			text-transform: uppercase;
			margin: 0 0.5rem;
			color: gray;
			font-size: 80%;
			&:last-child {
				margin-right: 0;
			}
			&.close-button {
				font-size: 100%;
			}
		}

		.search-container {
			display: flex;
			.search {
				flex-grow: 1;
				&.field {
					margin-bottom: 0;
				}
			}
		}
	}

	@media (max-width: 899px) {
		.main-menu a {
			margin: 0.5rem;
		}
	}
</style>
