<template>
	<div class="checkbox" :class="{ disabled: !value.amount, [attr]: true }">
		<label>
			<input type="checkbox" :value="value.value" :name="attr + '[]'" :checked="value.checked" :disabled="!value.amount"
			    @click="checkboxUpdate" />
			<i class="helper"></i>
			<span class="checkbox-label" v-html="translatedValue(value.value)">

			</span>
			<small>
				({{ value.amount }})
			</small>
		</label>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'FilterCheckbox',
		props: ['attr', 'value'],
		methods: {
			checkboxUpdate(checkbox) {
				const filter = {
					attr: this.attr,
					type: 'checkbox',
					value: this.value.value,
					checked: checkbox.srcElement.checked,
				};
				this.$store.dispatch('APPLY_FILTER', filter);
			},
			translatedValue(value) {
				return this.$gettext(value);
			},
		},
	};
</script>

<style lang="scss" scoped>
	.checkbox {
		margin: 0.2em 0;
		&.disabled {
			opacity: 0.5;
		}
		label {
			color: white;
		}
		.helper {
			background-color: white;
			top: 3px;
		}
		&.color .checkbox-label {
			display: inline-block;
			vertical-align: middle;
		}
	}
</style>
<style lang="scss">
	img.img-color {
		height: 32px;
		width: 32px;
	}
	input[type="checkbox"] {
		margin-right: .5em;
	}
</style>

