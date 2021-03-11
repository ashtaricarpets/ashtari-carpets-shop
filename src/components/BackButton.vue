<template>
	<router-link to="/secret" class="column back">
		<span class="icon">
			<i class="fa fa-caret-left"></i>
		</span>
		<translate>Back</translate>
	</router-link>
</template>

<script>
	export default {};
</script>


<style lang="scss" scoped>
	.back {
		padding-left: 0;
		padding-right: 0;
		.icon {
			margin-right: .4em;
		}
	}
</style>
