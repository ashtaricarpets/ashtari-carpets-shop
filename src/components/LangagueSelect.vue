<template>
	<div class="languages">
		<span v-for="(language, key) in $language.available" :key="key">
			<a @click="setLanguage(key)" v-if="key !== $language.current">{{ language }}</a>
		</span>
	</div>
</template>

<script>
	export default {
		methods: {
			setLanguage(lang) {
				this.$language.current = lang;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.languages {
		position: absolute;
		top: 0;
		right: 2rem;
		line-height: 2em;
		font-size: 80%;
	}
</style>
