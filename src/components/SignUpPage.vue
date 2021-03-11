<template>
	<div class="background">
		<div class="signup">
			<p>De voorraad van onze webwinkel wordt momenteel up to date gebracht. We blijven beschikbaar om jou te helpen.</p>
			<p>Laat je email-adres hier achter om op de hoogte te blijven!</p>
			<sign-up-form></sign-up-form>
		</div>
	</div>
</template>

<script>
import SignUpForm from './SignUpForm.vue';

export default {
	components: { SignUpForm },
	beforeCreate() {
		const html = document.getElementsByTagName('html')[0];
		html.classList.add('signup-page');
		html.classList.remove('has-navbar-fixed-top');
	}
};
</script>

<style lang="scss">

	.signup-page body {
		background-image: url(https://www.ashtaricarpets.com/img/blog/achterdeschermen_nieuwewinkel/1400/06A8304.jpg);
		background-size: cover;
		background-position: 50% 50%;
		background-repeat: no-repeat;
		min-height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.signup {
		padding: 2em;
		max-width: 600px;
		margin: 0 auto;
		background: rgba(255, 255, 255, 0.85);
		box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
	}
</style>
