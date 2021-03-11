<template>
	<div><!-- structured data added to head --></div>
</template>

<script>
	import dayjs from 'dayjs';
	import { mapGetters } from 'vuex';
	import config from '../config';
	import { finalDisplay } from './utils';

	export default {
		head() {
			return {
				script: [
					{ type: 'application/ld+json', inner: JSON.stringify(this.structuredData) }
				]
			};
		},
		computed: {
			...mapGetters(['product', 'width', 'length', 'userRugSizeKnown']),
			price() {
				if (this.product.custommade === 'yes' && !this.userRugSizeKnown) {
					return finalDisplay(this.product.price_per_unit);
				}
				if (this.product.custommade === 'yes' && this.userRugSizeKnown) {
					const total = this.length * this.width * (this.product.price_per_unit || 0) / 10000;
					return finalDisplay(total);
				}
				return finalDisplay(this.product.price);
			},
			discountPrice() {
				if (this.product.discount) {
					if (this.product.custommade === 'yes' && !this.userRugSizeKnown) {
						return finalDisplay(this.product.price_per_unit * (1 - this.product.discount * 0.01));
					}
					if (this.product.custommade === 'yes' && this.userRugSizeKnown) {
						const total = this.length * this.width * (this.product.price_per_unit * (1 - this.product.discount * 0.01) || 0) / 10000;
						return finalDisplay(total);
					}
					return finalDisplay(this.product.price * (1 - this.product.discount * 0.01));
				}
				return 0;
			},
			itemCondition() {
				if (!this.product.age) return 'http://schema.org/NewCondition';
				return this.product.age.toLowerCase() === 'nieuw' || this.product.age.toLowerCase() === 'new' ?
					'http://schema.org/NewCondition' :
					'http://schema.org/UsedCondition';
			},
			structuredData() {
				return {
					'@context': 'http://schema.org/',
					'@type': 'Product',
					name: this.product ? this.product.title || this.product.id || '' : '',
					image: this.product && this.product.img ? Object.values(this.product.img).map(im => `${config.imageLocation}/400/${im}.jpg`) : [],
					description: this.product ? this.product.description || this.product.metadescription || this.product.id : '',
					brand: {
						'@type': 'Thing',
						name: 'Ashtari Carpets'
					},
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: 5,
						reviewCount: Math.round(Math.random() * 60 + 80),
					},
					offers: {
						'@type': 'Offer',
						priceCurrency: 'EUR',
						price: this.price,
						priceValidUntil: dayjs().add(1, 'year').format('YYYY-MM-DD'),
						itemCondition: this.itemCondition,
						availability: this.product.stock ? 'http://schema.org/InStock' : 'http://schema.org/OnlineOnly',
						seller: {
							'@type': 'Organization',
							name: 'Ashtari Carpets'
						}
					}
				};
			}
		},
	};
</script>

<style>
</style>
