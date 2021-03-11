<template>
	<div class="main">
		<div class="columns is-mobile is-gapless">
			<div class="column has-padding">
				<top-header></top-header>
				<back-button></back-button>
				<h1 id="title"></h1>
				<div class="loading" v-show="isLoading">
					<img src="/static/images/spinner.svg" />
				</div>
				<div id="result" class="content" v-show="!isLoading">
				</div>
				<recent-list></recent-list>
			</div>
			<div class="column is-hidden-touch is-narrow">
				<sidebar></sidebar>
			</div>
		</div>
		<bottom-footer></bottom-footer>
	</div>
</template>

<script>
	import Sidebar from './Sidebar.vue';
	import TopHeader from './TopHeader.vue';
	import BottomFooter from './BottomFooter.vue';
	import RecentList from './RecentList.vue';
	import BackButton from './BackButton.vue';

	function getHTML(url, callback) {
		// Feature detection
		if (!window.XMLHttpRequest) return;

		// Create new request
		const xhr = new XMLHttpRequest();

		// Setup callback
		xhr.onload = function onLoad() {
			if (callback && typeof callback === 'function') {
				callback(this.responseXML);
			}
		};

		// Get the HTML
		xhr.open('GET', url);
		xhr.responseType = 'document';
		xhr.send();
	}

	export default {
		components: {
			Sidebar, TopHeader, BottomFooter, RecentList, BackButton
		},
		data() {
			return {
				isLoading: true
			};
		},
		watch: {
			$route(to) {
				this.loadPageContent(to);
			}
		},
		mounted() {
			this.loadPageContent(this.$route);
		},
		methods: {
			loadPageContent(route) {
				this.isLoading = true;
				window.scrollTo(0, 0);
				const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
				const self = this;

				getHTML(`${CORS_ANYWHERE}https://www.ashtaricarpets.com/nl/${route.params.text.replace(/\+/g, '/')}`, (response) => {
					const fetched = response.querySelector('#blog-post');
					const toReplace = document.querySelector('#result');
					toReplace.innerHTML = fetched.innerHTML.replace(/\/img\//g, 'https://www.ashtaricarpets.com/img/');
					self.isLoading = false;
				});
			}
		}
	};
</script>

<style lang="scss">
	.img-responsive {
		width: 100%;
	}

	.content {
		max-width: 1320px;
	}

	.blog-post__info {
		display: none;
	}

	#comments,
	#article-tags,
	#social {
		display: none;
	}

	.loading {
		height: 10em;
		img {
			height: 100%;
			display: block;
			margin: 0 auto;
		}
	}
</style>

