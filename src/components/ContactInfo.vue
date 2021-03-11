<template>
	<div class="contact-info">
		<h3 v-translate>Contact Info</h3>
		<strong>Ashtari Carpets</strong>
		<a href="https://goo.gl/maps/gFVMCtzSZwJ2"
		    target="_blank">
			<br />OUDE LEEUWENRUI 8A
			<br />2000 ANTWERPEN
			<br />BELGIË
		</a>
		<br /><br />T
		<a href="tel:003232301770">+32 3 230 17 70</a>
		<br />F
		<a href="fax:0032184187">+32 3 218 41 87</a>
		<br /><br />
		<span id="mmm">
			<a href="mailto:info@ashtaricarpets.com">info@ashtaricarpets.com</a>
		</span>
		<br />
		<a href="https://www.ashtaricarpets.com">www.ashtaricarpets.com</a>
		<br /><br />BTW BE 0567 632 221
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	.contact-info {
		color: white;

		strong {
			color: white;
		}

		a {
			color: white;

			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>
