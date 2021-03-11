<template>
	<div>
		<h3 v-translate>Information</h3>
		<ul>
			<li>
				<router-link to="/info/b2b" v-translate>B2B</router-link>
			</li>
			<li>
				<router-link to="/info/conditions" v-translate>Conditions</router-link>
			</li>
			<li>
				<router-link to="/info/contact" v-translate>Contact</router-link>
			</li>
			<li>
				<router-link to="/info/delivery" v-translate>Delivery</router-link>
			</li>
			<li>
				<router-link to="/info/faq" v-translate>FAQ</router-link>
			</li>
			<li>
				<router-link to="/info/ordering" v-translate>Ordering</router-link>
			</li>
			<li>
				<router-link to="/info/payment" v-translate>Payment</router-link>
			</li>
			<li>
				<router-link to="/info/privacy" v-translate>Privacy</router-link>
			</li>
			<li>
				<router-link to="/info/retour" v-translate>Retour</router-link>
			</li>
			<li>
				<router-link to="/info/warranty" v-translate>Warranty</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	li a {
		color: white;

		&:hover {
			text-decoration: underline;
		}
	}
</style>
