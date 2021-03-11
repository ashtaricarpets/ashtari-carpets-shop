<template>
	<div class="sort-by">
		<small v-translate>Sort by</small>
		<div class="select is-small">
			<select @input="handleChange">
				<option v-for="(sorter, index) in allSorters" :key="index" :value="`${sorter.attr}|${sorter.direction}`"
				    :selected="`${sorter.attr}|${sorter.direction}` === currentSort">
					{{ $gettext(sorter.attr) }} {{ $gettext(sorter.direction) }}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex';

	function sortSorters(a, b) {
		if (a.attr > b.attr) return 1;
		if (a.attr < b.attr) return -1;
		if (a.direction > b.direction) return 1;
		if (a.direction < b.direction) return -1;
		return 0;
	}

	export default {
		computed: {
			...mapState({
				sorters: state => state.productsorters,
				currentSort: state => state.currentSort,
			}),
			allSorters() {
				const ascSorters = this.sorters.map(sorter => Object.assign({}, sorter, { direction: 'asc' }));
				const descSorters = this.sorters.map(sorter => Object.assign({}, sorter, { direction: 'desc' }));
				const allSorters = [{ attr: null, direction: null }, ...[...ascSorters, ...descSorters].sort(sortSorters)];
				return allSorters;
			},
		},
		methods: {
			...mapActions({
				setCurrentSort: 'SET_CURRENT_SORT',
			}),
			handleChange(input) {
				console.log('input', input.target.value);
				this.setCurrentSort(input.target.value);
			}
		},
	};
</script>

<style scoped>
	.sort-by .select select {
		margin-left: .4em;
	}
</style>
