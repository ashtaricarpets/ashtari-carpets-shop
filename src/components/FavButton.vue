<template>
	<button class="button is-danger is-outlined" ref="favButton" @click.prevent="toggleFav(product)">
		<span class="icon">
			<i class="heart fa fa-fw" :class="{ 'fa-heart': isFav, 'fa-heart-o': !isFav }"></i>
		</span>
	</button>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		props: ['product'],
		computed: {
			...mapGetters(['favoriteProductIds']),
			isFav() {
				return this.favoriteProductIds.includes(this.product.id);
			},
		},
		methods: {
			...mapActions({
				addToFavsAction: 'ADD_TO_FAVS',
				removeFromFavs: 'REMOVE_FROM_FAVS',
			}),
			addToFavs(product) {
				this.addToFavsAction(product);
				const self = this;
				this.$nextTick(() => {
					const parent = self.$refs.favButton;
					const offset = parent.getBoundingClientRect();
					this.heartBurst.tune({
						children: {
							delay: 'rand(0, 500)',
							pathScale: 'rand(0.5, 1)',
							radius: 'rand(12, 15)',
							swirlSize: 'rand(10, 15)',
						},
						left: offset.left + parent.clientWidth / 2 + window.scrollX,
						top: offset.top + parent.clientHeight / 2 + window.scrollY,
					});
					this.heartBurst.replay();
				});
			},
			toggleFav(product) {
				if (!this.isFav) {
					this.addToFavs(product);
				} else {
					this.removeFromFavs(product);
				}
			},
		},
		dependencies: ['heartBurst'],
	};
</script>

<style lang="scss" scoped>
	.button.is-outlined {
		background-color: white;
	}
</style>
