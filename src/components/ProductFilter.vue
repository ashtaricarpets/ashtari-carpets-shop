<template>
	<div>
		<h3>{{ title }}</h3>
		<div v-if="productfilter.type === 'number'">
			<filter-range :productfilter="productfilter"></filter-range>
		</div>
		<div v-if="productfilter.type === 'enum' || productfilter.type === 'array'" :class="{ 'columns is-gapless is-multiline is-mobile': isInColumns }">
			<div v-for="(value, key) in productfilter.values" :key="key"
				:class="{ 'column': isInColumns, 'is-one-third-tablet is-one-third-mobile': isIn3Columns, 'is-half-tablet is-full-mobile': isIn2Columns }">
				<filter-checkbox :attr="productfilter.attr" :value="value"></filter-checkbox>
			</div>
		</div>
		<div v-if="productfilter.type === 'search'">
			<filter-search :productfilter="productfilter"></filter-search>
		</div>
	</div>
</template>

<script>
import FilterRange from './../components/FilterRange.vue';
import FilterCheckbox from './../components/FilterCheckbox.vue';
import FilterSearch from './../components/FilterSearch.vue';

export default {
	components: { FilterRange, FilterCheckbox, FilterSearch },
	props: ['productfilter'],
	computed: {
		isIn3Columns() {
			return ['color'].includes(this.productfilter.attr);
		},
		isIn2Columns() {
			return ['subcategory', 'category'].includes(this.productfilter.attr);
		},
		isInColumns() {
			return this.isIn3Columns || this.isIn2Columns;
		},
		title() {
			return this.$gettext(this.productfilter.attr);
		},
	},
	created() {
		console.log(this.productfilter.attr);
	}
};
</script>
