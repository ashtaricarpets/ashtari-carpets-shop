<template>
	<div id="info">
		<router-link to="/external-info/services+reinigen">
			<img src="https://www.ashtaricarpets.com/img/services/reinigen/600/reinigen.jpg" alt="Reinigen" />
			<p>Je tapijt reinigen</p>
		</router-link>
		<iframe scrolling="no" src="https://www.kiyoh.nl/widget.php?company=13597&amp;border=0" width="235px" height="250px" border="0" frameborder="0"></iframe>
		<router-link to="/external-info/services+herstellen">
			<img src="https://www.ashtaricarpets.com/img/services/herstellen/600/banner_herstelling.jpg" alt="Herstellen"
			/>
			<p>Je tapijt herstellen</p>
		</router-link>
		<router-link to="/external-info/services+zichtservice">
			<img src="https://www.ashtaricarpets.com/img/services/zichtservice/400/zichtservices.jpg" alt="Thuispresentatie"
			/>
			<p>Thuispresentatie</p>
		</router-link>
		<div class="recent">
			<h4 v-translate>Recent Blog Posts</h4>
			<article-feed :count="2"></article-feed>
		</div>
	</div>
</template>

<script>
	import ArticleFeed from './../components/ArticleFeed.vue';

	export default {
		components: { ArticleFeed },
	};
</script>

<style lang="scss">
	#info {
		img {
			display: block;
		}
		p {
			text-align: center;
			text-transform: uppercase;
			margin: 0;
			padding: 0.5em 0;
			font-size: 90%;
		}
		a {
			display: block;
			background-color: lighten(grey, 20);
			color: white;
			margin-bottom: 1px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		iframe {
			margin: 0 -5px 0 -2px;
		}

		.recent {
			margin-top: 3rem;
		}

		.article-feed {
			.feed-item {
				background-color: transparent;
				color: #333;

				p {
					text-align: left;
					text-transform: none;
				}

				.feed-categories p {
					text-transform: uppercase;
					font-size: 70%;
					margin-bottom: 0;
					padding-bottom: 0;
					font-weight: lighter;
				}

				.feed-title p {
					font-family: 'Crimson Text', serif;
					font-size: 110%;
					padding-top: 0;
					line-height: 1.1em;
				}
			}
		}
	}
</style>
