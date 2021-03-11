<template>
	<div class="section copyright">
		<div class="container is-fluid">
			<div class="columns">
				<div class="column is-mobile-6 credits">
					Website by <a href="https://www.digitalcomet.be" target="_blank">Digital Comet</a>
				</div>
				<div class="column is-mobile-6 has-text-right">
					&copy; 2018 - {{ currentYear }} R. Ashtari bvba
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			currentYear() {
				const date = new Date();
				return date.getFullYear();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.copyright {
		background: #333;
		color: #dedede;
		padding: 50px 0;
		font-size: 12px;
		line-height: 28px;
		margin-top: 4rem;
	}
	.credits {
		a {
			color: #fffffa;
			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
