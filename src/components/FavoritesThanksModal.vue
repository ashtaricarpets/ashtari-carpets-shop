<template>
	<div class="modal">
		<div class="modal-background"></div>
		<div class="modal-content">
			<button class="modal-close is-large" aria-label="close" @click="closeModal"></button>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			closeModal() {
				this.$emit('close');
			}
		}
	};
</script>

<style lang="scss">
	.sent .fa {
		display: block;
		margin: 0 auto;
		text-align: center;
		border: 0.15em solid #a08641;
		border-radius: 50%;
		width: 2em;
		height: 2em;
		line-height: 1.75em;
		padding-right: 0.2em;
		color: #a08641;
	}
</style>
