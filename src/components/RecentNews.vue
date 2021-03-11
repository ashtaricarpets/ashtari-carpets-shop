<template>
	<div class="recent-news">
		<h3 v-translate>Recent News</h3>
		<article-feed :count="5"></article-feed>
	</div>
</template>

<script>
	import ArticleFeed from './ArticleFeed.vue';

	export default {
		components: { ArticleFeed },
	};
</script>

<style lang="scss">
	.recent-news {
		a.feed-item {
			display: flex;
			color: white;

			&:hover {
				text-decoration: underline;
			}
		}

		.feed-thumbnail {
			flex: 1;
			flex-grow: 3;
			padding-right: 1rem;
			padding-bottom: 1rem;
		}

		.feed-title {
			flex: 1;
			flex-grow: 7;
		}

		.feed-categories {
			display: none;
		}
	}
</style>
