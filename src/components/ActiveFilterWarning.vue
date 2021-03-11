<template>
	<div>
		<div v-if="!activeFilters || activeFilters.length === 0">
			<button class="button is-small" @click="setFilterOpen(true)">
				<span>
					<i class="fa fa-fw fa-search"></i>
				</span>
				<translate>Filters</translate>
			</button>
		</div>
		<div class="active-filters" v-if="activeFilters && activeFilters.length > 0">
			<div class="filter-list">
				<small v-translate :translate-n="count" translate-plural="Active filters:" class="title">Active filter:</small>
				<a v-for="activeFilter in activeFilters" :key="activeFilter.attr" @click="deleteFilter(activeFilter)"
				 class="tag is-success">
					<span v-if="activeFilter.type === 'number'">
						<span>{{ $gettext(activeFilter.attr) }}</span>: {{ activeFilter.values[0] }} - {{
						activeFilter.values[1] }}
					</span>
					<span v-if="activeFilter.type === 'enum'">
						<span>{{ $gettext(activeFilter.attr) }}</span>: {{ activeFilter.values.filter(v =>
						v.checked).map(v => v.value).map(v => replaceImg($gettext(v))).join(', ') }}
					</span>
					<span v-if="activeFilter.type === 'array'">
						<span>{{ $gettext(activeFilter.attr) }}</span>: {{ activeFilter.values.filter(v =>
						v.checked).map(v => v.value).map(v => replaceImg($gettext(v))).join(', ') }}
					</span>
					<span v-if="activeFilter.type === 'search'">
						<span>{{ $gettext(activeFilter.attr) }}</span>: {{ activeFilter.value }}
					</span>
					<span class="delete is-small">&times;</span>
				</a>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { mapActions, mapGetters } from 'vuex';

	export default {
		computed: {
			...mapGetters(['activeFilters']),
			count() {
				return this.activeFilters.length;
			},
		},
		methods: {
			...mapActions({
				deleteFilter: 'DELETE_FILTER',
				setFilterOpen: 'SET_FILTER_OPEN',
			}),
			replaceImg(text) {
				const found = text.match(/alt="(.*)"/i);
				return found ? found[1] : text;
			}
		},
	};
</script>

<style lang="scss" scoped>
	.active-filters {
		display: flex;
		.title {
			margin-right: .4em;
		}
	}

	.icon {
		margin-right: 0.5em;
	}

	a > span {
		margin-right: 0.5em;
	}

	a.tag {
		margin-right: 0.5em;
		text-decoration: none;
		cursor: pointer;
		&:hover {
			opacity: 0.5;
		}
	}
</style>
