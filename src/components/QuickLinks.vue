<template>
	<div class="quick-links has-text-centered-touch has-text-right-desktop">
		<a
			v-for="value in values"
			:key="value.value"
			@click="setFilter(value)"
			:class="{ 'is-active': value.checked && $route.path === '/' }">
				{{ value.value }}
			</a>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	const attr = 'category';
	const order = ['tapijten', 'kelims', 'designers & brands', 'poefen', 'kussens', 'handtassen', 'accessoires', 'toebehoren'].reverse();

	function byValue(a, b) {
		return order.indexOf(b.value) - order.indexOf(a.value);
	}

	export default {
		computed: {
			...mapState({
				values: state => (state.productfilters.find(pf => pf.attr === attr) ?
					state.productfilters.find(pf => pf.attr === attr).values.sort(byValue) : []),
			}),
		},
		methods: {
			setFilter(value) {
				const filter = {
					attr,
					type: 'checkbox',
					value: value.value,
					checked: true,
				};
				this.$store.dispatch('DELETE_FILTERS');
				this.$store.dispatch('APPLY_FILTER', filter);
				this.$router.push('/');
			},

		}
	};
</script>

<style lang="scss" scoped>
	.quick-links {
		height: 100%;

		a {
			cursor: pointer;
			text-transform: uppercase;
			margin: 0 .5rem;
			font-size: 90%;

			&:last-child {
				margin-right: 0;
			}
			&.is-active {
				border-bottom: 2px solid #A08641;
			}
		}
	}

</style>
