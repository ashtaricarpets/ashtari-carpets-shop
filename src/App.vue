<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	created() {
		this.checkInitialState();
		// console.log('Tawk_API', Tawk_API);
		// if (Tawk_API) {
		// 	// eslint-disable-line camelcase
		// 	// const self = this;
		// 	Tawk_API.onStatusChange = status => {
		// 		console.log('Tawk_API status', status);
		// 		// if (status === 'online' || status === 'away') self.setIsChatPossible(true);
		// 		// else self.setIsChatPossible(false);
		// 	};
		// 	Tawk_API.onLoad = () => {
		// 		console.log('Tawk_API showWidget in 10s');
		// 		// const status = Tawk_API.getStatus();
		// 		// if (status === 'online' || status === 'away') self.setIsChatPossible(true);
		// 		// else self.setIsChatPossible(false);
		// 		setTimeout(() => {
		// 			console.log('Tawk_API showWidget');
		// 			if (['online', 'away'].includes(Tawk_API.getStatus())) Tawk_API.toggle();
		// 		}, 10500);
		// 	};
		// }
	},
	methods: {
		...mapActions({
			checkInitialState: 'CHECK_INITIAL_STATE',
			setIsChatPossible: 'SET_IS_CHAT_POSSIBLE',
		}),
	},
};
</script>

<style lang="scss">
@import './sass/ashtari.scss';

html {
	height: 100%;
	box-sizing: border-box;
	// background-color: #333;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body {
	position: relative;
	margin: 0;
	min-height: 100%;
	font-family: 'Open Sans', 'Roboto', Helvetica, Arial, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: 'Crimson Text', serif;
	line-height: 1.1em;
	margin: 0.5rem 0;
}

p {
	line-height: 1.5em;
	margin-bottom: 0.75rem;
}

b,
strong {
	font-weight: 700;
}

h1 {
	font-size: 2em;
}
h2 {
	font-size: 1.8em;
}
h3 {
	font-size: 1.6em;
}
h4 {
	font-size: 1.4em;
}
h5 {
	font-size: 1.2em;
}
h6 {
	font-size: 1.1em;
}

a {
	text-decoration: none;
}

.control .icon .fa {
	line-height: 2.25em;
	width: 2.25em;
	text-align: center;
}

.heart-burst {
	z-index: 99999;
}

.container {
	margin-left: 32px;
	margin-right: 32px;
}

.columns.is-gapless > .column.has-padding {
	padding: 0 5rem !important;
}

@media screen and (max-width: 900px) {
	.columns.is-gapless > .column.has-padding {
		padding: 0 3rem !important;
	}
}

@media screen and (max-width: 600px) {
	.columns.is-gapless > .column.has-padding {
		padding: 0 2rem !important;
	}
}
</style>
