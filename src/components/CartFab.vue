<template>
	<div class="fab snipcart-checkout" @click="openCart">
		<span class="icon is-small">
			<i class="fa fa-shopping-cart"></i>
		</span>
	</div>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions({
				openCart: 'OPEN_CART'
			})
		}
	};
</script>

<style>
	.fab {
		width: 60px;
		height: 60px;
		background-color: #2B854A;
		border-radius: 50%;
		box-shadow: 0 4px 5px -1px rgba(0,0,0,0.5);
		transition: all 250ms ease-in-out;

		font-size: 35px;
		color: white;
		text-align: center;
		line-height: 60px;

		position: fixed;
		right: 15px;
		top: 10px;
		z-index: 34;
		cursor: pointer;
	}

	.fab:hover {
		box-shadow: 0 3px 5px 0 #666;
		transform: scale(1.05);
	}
</style>
