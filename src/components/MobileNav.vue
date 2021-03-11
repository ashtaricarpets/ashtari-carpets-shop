<template>
	<div class="navbar is-fixed-top">
		<div class="navbar-menu is-active mobile-nav">
			<div class="navbar-start">
				<a class="navbar-item">
					<logo></logo>
				</a>
			</div>

			<div class="navbar-end">
				<a class="navbar-item" href="javascript:void(Tawk_API.toggle())" v-if="isChatPossible">
					<i class="fa fa-fw fa-comments"></i>
				</a>
				<a class="navbar-item" @click="openSearch">
					<i class="fa fa-fw fa-search"></i>
				</a>
				<a class="navbar-item" @click="setFavoritesModalOpen(true)">
					<i class="fa fa-fw fa-heart"></i>
					<span class="tag is-small" v-if="numberOfFavProducts > 0">{{ numberOfFavProducts }}</span>
				</a>
				<a class="navbar-item" @click="openCart">
					<i class="fa fa-fw fa-shopping-cart"></i>
					<span class="tag is-small" v-if="numberOfCartProducts > 0">{{ numberOfCartProducts }}</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex';
	import Logo from './Logo.vue';

	export default {
		components: { Logo },
		computed: {
			...mapState(['isChatPossible']),
			...mapGetters(['numberOfCartProducts', 'numberOfFavProducts']),
		},
		methods: {
			...mapActions({
				openCart: 'OPEN_CART',
				setFilterOpen: 'SET_FILTER_OPEN',
				setFavoritesModalOpen: 'SET_FAVORITES_MODAL_OPEN'
			}),
			openSearch() {
				this.setFilterOpen(true);
				this.$router.push('/');
			},
		},
	};
</script>

<style lang="scss">
	.mobile-nav.is-active {
		display: flex;
		justify-content: space-between;
		> div {
			display: flex;
		}
		padding: 0 1.25rem;
		i {
			vertical-align: bottom;
		}
	}
	.navbar-menu {
		-webkit-box-shadow: none;
		box-shadow: none;
		border-bottom: 1px solid whitesmoke;
	}

	.navbar-item .tag {
		background-color: red;
		font-size: .5rem;
		border: 1px solid white;
		color: white;
		border-radius: 50%;
		width: 1rem;
		height: 1rem;
		line-height: .7rem;
		position: absolute;
		top: 1em;
		right: .5em;
		font-weight: bold;
	}
</style>
