<template>
	<div class="main">
		<div class="columns is-mobile is-gapless">
			<div class="column has-padding">
				<top-header></top-header>
				<back-button></back-button>
				<div class="text content" v-html="text"></div>
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
	import MarkdownIt from 'markdown-it';
	import Sidebar from './Sidebar.vue';
	import TopHeader from './TopHeader.vue';
	import BottomFooter from './BottomFooter.vue';
	import RecentList from './RecentList.vue';
	import BackButton from './BackButton.vue';

	export default {
		components: {
			Sidebar, TopHeader, BottomFooter, RecentList, BackButton
		},
		data() {
			return {
				text: ''
			};
		},
		watch: {
			$route(to) {
				this.fetchAndScroll(to);
			}
		},
		mounted() {
			this.fetchAndScroll(this.$route);
		},
		methods: {
			fetchAndScroll(route) {
				window.scrollTo(0, 0);
				fetch(`/static/info/${route.params.text}.nl.md`)
					.then(result => result.text())
					.then((text) => {
						const md = new MarkdownIt();
						this.text = md.render(text);
					});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		max-width: 1320px;
	}
</style>
