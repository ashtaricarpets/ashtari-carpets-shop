<template>
	<div id="footer">
		<footer class="footer">
			<div class="container is-fluid">
				<div class="columns is-multiline is-marginless">
					<div class="column is-half-tablet is-one-quarter-desktop">
						<opening-hours></opening-hours>
					</div>
					<div class="column is-half-tablet is-one-quarter-desktop">
						<recent-news></recent-news>
					</div>
					<div class="column is-half-tablet is-one-quarter-desktop">
						<contact-info></contact-info>
					</div>
					<div class="column is-half-tablet is-one-quarter-desktop">
						<footer-links></footer-links>
					</div>
				</div>
			</div>
			<copyright></copyright>
		</footer>
		<mobile-nav></mobile-nav>
		<cart-modal></cart-modal>
		<favorites-modal></favorites-modal>
	</div>
</template>

<script>
import OpeningHours from './OpeningHours.vue';
import FooterLinks from './FooterLinks.vue';
import RecentNews from './RecentNews.vue';
import ContactInfo from './ContactInfo.vue';
import Copyright from './Copyright.vue';
import CartModal from './CartModal.vue';
import FavoritesModal from './FavoritesModal.vue';
import MobileNav from './MobileNav.vue';

export default {
	components: {
		OpeningHours,
		FooterLinks,
		RecentNews,
		ContactInfo,
		Copyright,
		CartModal,
		FavoritesModal,
		MobileNav,
	},
};
</script>

<style lang="scss">
.footer {
	padding-top: 4rem;
	background-color: #58534b;
	color: white;
}

.modal {
	transition: opacity 200ms;
	opacity: 0;
	&.is-active {
		opacity: 1;
	}
}
</style>
