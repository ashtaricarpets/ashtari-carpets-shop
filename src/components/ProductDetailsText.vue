<template>
	<div class="text">
		<h1 v-if="product.title">{{ product.title }}
			<small v-if="product.sold !== undefined">(<translate>sold</translate>)</small>
			<small v-if="product.option !== undefined">(<translate>option</translate>)</small>
		</h1>
		<h1 v-if="!product.title">{{ product.id }}
			<small v-if="product.sold !== undefined">(<translate>sold</translate>)</small>
			<small v-if="product.option !== undefined">(<translate>option</translate>)</small>
		</h1>
		<h2 v-if="product.subtitle">{{ product.subtitle }}</h2>
		<!-- <pre>{{ JSON.stringify(product, null, 4) }}</pre> -->
		<table>
			<tr v-if="product.id">
				<td v-translate>id</td>
				<td>{{ product.id }}</td>
			</tr>
			<tr v-if="product.designer">
				<td v-translate>designer</td>
				<td>{{ product.designer }}</td>
			</tr>
			<tr v-if="product.origin">
				<td v-translate>origin</td>
				<td>{{ product.origin }}</td>
			</tr>
			<tr v-if="product.production">
				<td v-translate>production</td>
				<td>{{ product.production }}</td>
			</tr>
			<tr v-if="product.stock || product.deliverytime">
				<td v-translate>deliverytime</td>
				<td>{{ product.stock ? `${product.stock} in voorraad` : product.deliverytime }}</td>
			</tr>
			<tr v-if="product.chain">
				<td v-translate>chain</td>
				<td>{{ product.chain }}</td>
			</tr>
			<tr v-if="product.pool">
				<td v-translate>pool</td>
				<td>{{ product.pool && Array.isArray(product.pool) ? product.pool.join(', ') : '' }}</td>
			</tr>
			<tr v-if="product.height">
				<td v-translate>height</td>
				<td>{{ product.height }} mm</td>
			</tr>
			<tr v-if="product.thickness">
				<td v-translate>thickness</td>
				<td>{{ product.thickness }} mm</td>
			</tr>
			<tr v-if="product.custommade === 'yes'">
				<td colspan="2" class="newline" v-translate>This rug is custom made for you. Please enter your preferred dimensions:</td>
			</tr>
			<tr v-if="product.custommade === 'yes'">
				<td v-translate>length</td>
				<td>
					<div class="field has-addons">
						<p class="control">
							<input class="input is-small" type="number" step="5" min="0" max="900" v-model="length" />
						</p>
						<p class="control">
							<a class="button is-small is-static">
								cm
							</a>
						</p>
					</div>
				</td>
			</tr>
			<tr v-if="product.custommade === 'yes'">
				<td v-translate>width</td>
				<td>
					<div class="field has-addons">
						<p class="control">
							<input class="input is-small" type="number" step="5" min="0" max="500" v-model="width" />
						</p>
						<p class="control">
							<a class="button is-small is-static">
								cm
							</a>
						</p>
					</div>
				</td>
			</tr>
			<tr v-if="product.custommade !== 'yes' && product.length">
				<td v-translate>length</td>
				<td>{{ product.length }} cm</td>
			</tr>
			<tr v-if="product.custommade !== 'yes' && product.width">
				<td v-translate>width</td>
				<td>{{ product.width }} cm</td>
			</tr>
		</table>

		<div class="buttons">
			<fav-button :product="product"></fav-button>
			<info-button :product="product"></info-button>
			<cart-button :product="product" :is-showing-price="true"></cart-button>
			<button class="button" disabled v-if="product.sold !== undefined" v-translate>sold</button>
		</div>

		<p class="description" v-html="(product.description || '').replace(/\n/g,'<br/>')"></p>

	</div>

</template>

<script>
	import config from '../config';
	import CartButton from './CartButton.vue';
	import FavButton from './FavButton.vue';
	import InfoButton from './InfoButton.vue';

	export default {
		components: { CartButton, FavButton, InfoButton },
		props: ['product'],
		data() {
			return {
				imageLocation: config.imageLocation,
			};
		},
		computed: {
			length: {
				get() {
					return this.$store.state.userInfo.rugSize.length;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_RUG_LENGTH', value);
				},
			},
			width: {
				get() {
					return this.$store.state.userInfo.rugSize.width;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_RUG_WIDTH', value);
				},
			},
		},
	};
</script>

<style lang="scss" scoped>
	.text {
		display: flex;
		flex-direction: column;
		margin-bottom: 3rem;

		h1 {
			margin: 0 0 1rem;
			line-height: 1;
		}

		table {
			display: block;
		}

		td {
			font-size: 90%;
			padding: 0 0 0.5em;
			&.newline {
				padding-top: 1.5em;
			}
			&:first-child {
				padding-left: 0;
				padding-right: 2em;
				font-weight: bold;
			}
		}

		p.control {
			margin-bottom: 0;
		}

		.description {
			font-size: 95%;
		}
	}

	.buttons {
		padding: 1.5rem 0;
		display: flex;

		.button {
			flex: 0 1;
		}
	}
</style>
