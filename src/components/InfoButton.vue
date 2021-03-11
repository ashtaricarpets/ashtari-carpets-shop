<template>
	<span>
		<button class="button is-info is-outlined" @click="askForInfo">
			<i class="fa fa-info"></i>
		</button>
		<span></span>
	</span>
</template>

<script>
	import { mapActions, mapState } from 'vuex';

	export default {
		props: ['product'],
		computed: {
			...mapState({
				userInfo: 'userInfo',
			}),
		},
		methods: {
			...mapActions({
				addToFavsAction: 'ADD_TO_FAVS',
				setFavoritesModalOpen: 'SET_FAVORITES_MODAL_OPEN'
			}),
			askForInfo() {
				this.addToFavsAction(this.product);
				const options = this.userInfo.favoritesOptions;
				if (!options.includes('graag-meer-info')) {
					this.$store.commit('UPDATE_FAVORITES_OPTIONS', options.concat('graag-meer-info'));
				}
				this.setFavoritesModalOpen(true);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.is-info .fa {
		margin: 0 0.1em;
	}
</style>
