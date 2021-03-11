<template>
	<div class="article-feed">
		<a :href="item.url" v-for="item in items" :key="item.title" class="feed-item" target="_blank">
			<div class="feed-thumbnail">
				<img :src="item.image" :alt="item.title" />
			</div>
			<div class="feed-categories">
				<p>{{ item.categories.join(', ') }}</p>
			</div>
			<div class="feed-title">
				<p>{{ item.title }}</p>
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		props: {
			count: {
				type: Number,
				default: 5,
			}
		},
		data() {
			return {
				items: []
			};
		},
		mounted() {
			if (!window.__PRERENDER_INJECTED) { // eslint-disable-line
				this.fetchFeed();
			}
		},
		methods: {
			fetchFeed() {
				const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
				// parser.parseURL(`${CORS_ANYWHERE}https://www.ashtaricarpets.com/nl/blog/index.xml`)
				// 	.then((response) => {
				// 		console.log(response);
				// 	})
				fetch(`${CORS_ANYWHERE}https://www.ashtaricarpets.com/nl/blog/index.json`)
				.then(response => response.json())
				.then((json) => {
					this.items = json.items.slice(0, this.count);
				})
				.catch(() => {
					this.isValid = false;
				});
			}
		},
	};
</script>

<style>

</style>
