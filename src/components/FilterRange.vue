<template>
	<div class="slider-container">
		<vue-slider
		:ref="productfilter.attr"
		:dot-size="0"
		:height="1"
		:value="productfilter.values"
		:min="productfilter.min"
		:max="productfilter.max"
		:interval="computeInterval()"
		:piecewise="true"
		@drag-end="sliderUpdate"
		:real-time="true"
		:formatter="computeFormatter()"
		></vue-slider>
	</div>
</template>

<script type="text/javascript">
import vueSlider from 'vue-slider-component';

export default {
	components: { vueSlider },
	props: ['productfilter'],
	methods: {
		sliderUpdate(slider) {
			const filter = {
				attr: this.productfilter.attr,
				type: 'range',
				values: slider.getValue(),
			};
			this.$store.dispatch('APPLY_FILTER', filter);
		},
		computeInterval() {
			const { min, max } = this.productfilter;
			if (min !== 0 && max % min === 0) return min;
			const diff = Math.abs(max - min);
			const log = Math.log10(diff);
			const pow10 = Math.max(Math.floor(log - 1), 0);
			return pow10 > 2 ? (10 ** pow10) / 2 : (10 ** pow10);
		},
		computeFormatter() {
			const { min, max } = this.productfilter;
			return (min > 10000 && max > 10000) ? v => `${Math.round(v / 1000)}k` : '{value}';
		},
	}
};
</script>

<style lang="scss">
.slider-container {
	padding-top: 2em;
	padding-right: 1em;
}

.vue-slider-component .vue-slider-tooltip {
	background-color: white;
	border: 1px solid white;
	border-radius: 0;
	color: #333;
	font-size: .9em;
}

.vue-slider-component .vue-slider {
	background-color: #999;
}

.vue-slider-component .vue-slider-process {
	background-color: white;
}

</style>
