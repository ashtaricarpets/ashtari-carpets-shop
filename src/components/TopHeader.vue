<template>
	<div class="top-header">
		<div class="other columns is-desktop">
			<div class="column is-narrow has-text-centered">
				<logo></logo>
			</div>
			<div class="column is-flex">
				<div class="columns">
					<main-menu class="column"></main-menu>
				</div>
				<div class="columns">
					<quick-links class="column"></quick-links>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Logo from './Logo.vue';
	import MainMenu from './MainMenu.vue';
	import QuickLinks from './QuickLinks.vue';

	export default {
		components: {
			Logo, MainMenu, QuickLinks
		},
	};
</script>

<style lang="scss" scoped>
	.top-header {
		margin-bottom: 3em;

		.other {
			margin-top: 2rem;
		}

		.is-flex {
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>
