<template>
	<div class="field search">
		<p class="control has-icons-left">
			<span class="icon is-small is-left">
				<i class="fa fa-search"></i>
			</span>
			<input class="input" type="text" :required="false" v-model="search" />
		</p>
	</div>
</template>

<script type="text/javascript">
	import debounce from 'debounce';
	import { mapActions } from 'vuex';

	export default {
		props: ['productfilter'],
		computed: {
			search: {
				get() {
					return this.productfilter.value;
				},
				set: debounce(function setFilter(value) {
					const filter = {
						attr: 'search',
						type: 'search',
						value,
					};
					this.applyFilter(filter);
				}, 500),
			}
		},
		methods: {
			...mapActions({
				applyFilter: 'APPLY_FILTER',
			}),
		}
	};
</script>
