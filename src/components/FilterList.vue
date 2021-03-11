<template>
	<div class="product-filters" :class="{ opened: filterSettings.isOpen, closed: !filterSettings.isOpen }"
	    @mouseenter.self="openNav" @mouseleave.self="closeAfterAWhile" @click.self="toggle">
		<div class="filters-trigger is-hidden-touch">
			<span v-translate>Filters</span>
		</div>
		<div class="filters-content">
			<!-- <input type="checkbox" v-model="isStayingOpen" /> <translate>Stay open</translate> -->
			<button class="modal-close is-large" aria-label="close" @click="closeNav"></button>
			<h2>
				<i class="fa fa-search"></i>
				<translate>Filters</translate>
			</h2>
			<p><i v-translate>Use filters to find the product you want</i>.</p>
			<p>
				<a v-if="activeFilters.length > 0" @click="deleteFilters">&times;
					<translate>delete all filters</translate>
				</a>
			</p>
			<form @keypress="captureEnter">
				<div class="productfilter" :class="productfilter.attr" v-for="productfilter in filteredProductfilters" :key="productfilter.attr">
					<product-filter :productfilter="productfilter"></product-filter>
				</div>
			</form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapActions, mapGetters, mapState } from 'vuex';
	import ProductFilter from './ProductFilter.vue';


	const order = ['search', 'color', 'category', 'subcategory', 'price', 'length', 'width', 'designer', 'custommade'].reverse();

	function byFilterName(a, b) {
		return order.indexOf(b.attr) - order.indexOf(a.attr);
	}

	export default {
		components: { ProductFilter },
		data() {
			return {
				timer: undefined,
				isStayingOpen: true,
			};
		},
		computed: {
			filteredProductfilters() {
				return this.productfilters ?
					this.productfilters
						.filter(f => (f.type === 'number' || f.type === 'enum' || f.type === 'array' || f.type === 'search'))
						.sort(byFilterName) :
					null;
			},
			...mapState({
				productfilters: state => state.productfilters,
				filterSettings: state => state.filterSettings,
			}),
			...mapGetters(['activeFilters']),
		},
		mounted() {
			const self = this;
			if (this.filteredProductfilters && this.filteredProductfilters.length === 0) {
				this.loadFilters().then(() => {
					if (self.$route.query) {
						console.log('self.$route.query', self.$route.query);
					}
					// if (!this.filterSettings.isTourDone) {
					// 	setTimeout(() => {
					// 		this.setFilterOpen(true);
					// 	}, 4000);
					// }
				});
			} else {
				if (this.$route.query) {
					console.log('this.$route.query', this.$route.query);
				}
				// if (!this.filterSettings.isTourDone) {
				// 	setTimeout(() => {
				// 		this.setFilterOpen(true);
				// 	}, 4000);
				// }
			}
		},
		methods: {
			...mapActions({
				setTourDone: 'SET_TOUR_DONE',
				setFilterOpen: 'SET_FILTER_OPEN',
				loadFilters: 'LOAD_FILTERS',
				setBusy: 'SET_BUSY',
				unsetBusy: 'UNSET_BUSY',
				deleteFiltersAction: 'DELETE_FILTERS',
				deleteProducts: 'DELETE_PRODUCTS',
				setAmounts: 'SET_AMOUNTS',
				addProducts: 'ADD_PRODUCTS',
			}),
			deleteFilters() {
				this.setBusy();
				this.deleteFiltersAction();
				this.deleteProducts();
				this.setAmounts();
				this.addProducts().then((numberFetched) => {
					if (numberFetched > 0) this.unsetBusy();
				});
			},
			toggle() {
				this.setFilterOpen(!this.filterSettings.isOpen);
			},
			openNav() {
				this.setFilterOpen(true);
			},
			closeNav() {
				this.setFilterOpen(false);
				this.setTourDone();
			},
			closeAfterAWhile() {
				if (!this.isStayingOpen) {
					const self = this;
					this.timer = setTimeout(() => {
						self.closeNav();
					}, 500);
				}
			},
			remainOpen() {
				if (this.timer) clearTimeout(this.timer);
			},
			captureEnter(e) {
				if (this.isEnter(e)) {
					e.preventDefault();
					this.closeNav();
				}
			},
			isEnter(e) {
				e = e || new Event();
				const txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
				return !(txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13);
			},
		},
	};
</script>

<style lang="scss">
	.productfilter.color {
		.column {
			margin-bottom: 1em;
		}
	}
	.product-filter {
		margin-bottom: 1em;
	}
</style>

<style lang="scss" scoped>
	/* The side navigation menu */

	$trigger-width: 1.5rem;

	h2 i {
		margin-right: .4em;
	}

	button.modal-close {
		right: calc(1rem + #{$trigger-width});
		z-index: 1;
	}

	.product-filters {
		z-index: 35;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// overflow-y: scroll;
		direction: rtl;
		display: flex;
		flex-direction: row;
		transform: translateX(-100%);
		transition: transform 300ms ease-out;
		will-change: transform;
		color: #fff;
		box-sizing: border-box;
		font-size: 85%;
		* {
			direction: ltr;
		}
		&.closed {
			transform: translateX(100%);
		}
		&.opened {
			transform: translateX(0);
		}
		.filters-content {
			min-height: 100%;
			padding: 1rem;
			background-color: rgba(#333, 1);
			overflow-x: hidden;
			flex-grow: 1;
			form {
				margin-bottom: 5rem;
			}
		}
		a {
			color: white;
			text-decoration: none;
			&:hover,
			&:focus {
				color: #f1f1f1;
			}
		}
	}

	.filters-trigger {
		background: rgba(#333, 1);
		width: $trigger-width;
		display: inline-block;
		height: calc(80px + 2rem);
		margin-top: 3.5rem;
		text-decoration: none;
		flex-shrink: 0;
		cursor: pointer;
		span {
			letter-spacing: 1px;
			width: 100%;
			bottom: -55%;
			text-align: center;
			color: white;
			font-size: 1rem;
			text-transform: uppercase;
			display: block;
			position: relative;
			transform: rotate(-90deg);
		}
	}

	@media screen and (min-width: 600px) {
		.product-filters {
			width: auto;
			&.closed {
				transform: translateX(-600px);
			}
			.filters-content {
				width: 600px;
			}
		}
	}

	@media screen and (min-width: 1800px) {
		.product-filters {
			position: relative;

			&.closed {
				transform: translateX(0);
			}
			.filters-trigger,
			.closebtn {
				display: none;
			}
			.filters-content {
				width: 400px;
			}
		}
	}
</style>
