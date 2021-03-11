<template>
	<div class="sidebar" ref="sidebar">
		<!-- <cart-list></cart-list> -->
		<info-bar></info-bar>
	</div>
</template>

<script>
	// import CartList from './../components/CartList.vue';
	import InfoBar from './../components/InfoBar.vue';

	export default {
		components: { InfoBar },
	};
</script>

<style lang="scss" scoped>
	.sidebar {
		// border-left: 1px solid hsl(0, 0, 96);
		width: 175px;
		margin-bottom: 6rem;

		.tabs {
			height: 2rem;

			ul {
				height: 2rem;
				padding-left: 0;
				margin: 0;

				li.disabled {
					opacity: 0.1;
				}

				a {
					height: 2rem;
					cursor: pointer;
					padding: 0;
					font-size: 1.6rem;
				}
			}
		}

		#widget {
			border: 0;
		}
	}

	@media screen and (min-width: 1200px) {
		.sidebar {
			width: 231px;
		}
	}
</style>
