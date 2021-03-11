<template>
	<div class="buttons">
		<a @click="refresh" :title="refreshTitle">
			<i class="fa fa-refresh"></i>
		</a>
	</div>
</template>

<script type="text/javascript">
	import { mapActions } from 'vuex';

	export default {
		computed: {
			refreshTitle() {
				return this.$gettext('Refresh everything');
			}
		},
		methods: {
			...mapActions({
				refreshState: 'REFRESH'
			}),
			refresh() {
				this.refreshState();
			}
		},
	};
</script>

<style lang="scss" scoped>
	.buttons {
		position: fixed;
		text-decoration: none;
		padding: .5em;
		margin: 0;
		right: 1em;
		bottom: 0;
		font-size: .8rem;
		a {
			color: whitesmoke;
			transition: color 250ms;
			&:hover {
				color: red;
			}
		}
	}
</style>
