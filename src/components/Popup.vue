<template>
	<div class="popup" :class="{ show: isShowing, 'almost-show': isAlmostShowing }" @click="show">
		<div class="close ns-close" @click.stop.prevent="closePopup">&times;</div>
		<h3>
			<span class="bol">
				<i class="fa fa-book"></i>
			</span>
			<translate>Receive free e-book "Spot removal"!</translate>
		</h3>
		<div class="content">
			<div class="image">
				<img class="ebook" src="static/images/vlekkenwijzer.jpg" />
			</div>
			<form>
				<div class="form-group">
					<input type="text" required="false" name="name" v-model="name" />
					<label class="control-label" for="name" v-translate>Your name</label>
					<i class="bar"></i>
				</div>
				<div class="form-group">
					<input type="text" required="required" name="contact" v-model="contact" />
					<label class="control-label" for="contact" v-translate>Email or phone</label>
					<i class="bar"></i>
				</div>
				<center>
					<button class="button" type="button" @click.stop.prevent="send">
						<span>
							<i class="fa fa-book">
							</i>
							<translate>Receive e-book</translate>
						</span>
					</button>
					<p>
						<small>
							<a href="#" @click.stop.prevent="closePopup" v-translate>no thanks, I'm not interested</a>
						</small>
					</p>
				</center>
			</form>
		</div>
	</div>
</template>

<script type="text/javascript">
	import { validateEmail, validatePhone } from './utils.js';

	export default {
		name: 'Popup',
		data() {
			return {
				isShowing: false,
				isAlmostShowing: false,
				hasEventListener: false,
			};
		},
		computed: {
			name: {
				get() {
					return this.$store.state.userInfo ? this.$store.state.userInfo.name : null;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_NAME', value);
				}
			},
			contact: {
				get() {
					return this.$store.state.userInfo ? this.$store.state.userInfo.contact : null;
				},
				set(value) {
					this.$store.commit('UPDATE_USER_CONTACT', value);
				}
			}
		},
		mounted() {
			if (!this.contact && !this.$store.state.userInfo.hasReactedToPopup) {
				window.addEventListener('scroll', this.check);
				this.hasEventListener = true;
			}
		},
		beforeDestroy() {
			if (this.hasEventListener) window.removeEventListener('scroll', this.check);
		},
		methods: {
			check() {
				if (window.scrollY >= 3000) {
					this.isShowing = true;
				}
			},
			show() {
				this.isAlmostShowing = false;
				this.isShowing = true;
			},
			closePopup() {
				this.isAlmostShowing = true;
				this.isShowing = false;
				if (this.hasEventListener) window.removeEventListener('scroll', this.check);
				this.hasEventListener = false;
				this.$store.dispatch('SET_HAS_REACTED_TO_POPUP');
			},
			send() {
				if ((validatePhone(this.contact) || validateEmail(this.contact)) && this.name) {
					this.$store.dispatch('SEND_BOOK').then(() => {
						this.closePopup();
						this.isAlmostShowing = false;
					});
				}
			},
		},
	};
</script>

<style lang="scss" scoped>
	.popup {
		display: none;
		width: 35em;
		background: white;
		bottom: 0;
		right: -5em;
		transform: translateX(40em);
		position: fixed;
		box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.5);
		transition: transform 700ms ease-in-out;
		will-change: transform;
		z-index: 999;
		padding: 1em 1em 0;
		small a {
			color: #333;
			opacity: 0.5;
			font-size: 0.75em;
			&:hover {
				text-decoration: underline;
			}
		}
		.button {
			padding: 0.75rem 1.5rem;
			margin: 1em 0 0;
		}
		.form-group {
			margin-bottom: 1.25em;
			margin-top: 1.25em;
		}
		.bol {
			opacity: 0;
			transition: transform 300ms ease-in-out, opacity 300ms ease-in-out;
			will-change: transform, opacity;
			background: red;
			color: white;
			width: 2rem;
			height: 2rem;
			display: inline-block;
			margin-left: -14rem;
			bottom: 1em;
			cursor: pointer;
			position: absolute;
			border-radius: 50%;
			padding: 0.1em 0em;
			text-align: center;
			margin-top: -0.1em;
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			border: 2px solid white;
			font-size: 1rem;
			line-height: 2rem;
		}
		&.show {
			transform: translateX(-5em);
		}
		&.almost-show {
			.bol {
				opacity: 1;
			}
		}
		.content {
			display: flex;
			flex-direction: row;
			.image,
			form {
				flex: 1;
				img.ebook {
					width: 100%;
				}
			}
			.image {
				justify-content: center;
				align-items: center;
				display: flex;
				box-sizing: border-box;
				padding-right: 2em;
			}
		}

		.close {
			position: absolute;
			top: 0;
			right: 0.3em;
			width: 1.5em;
			height: 1.5em;
			text-align: right;
			cursor: pointer;
			z-index: 500;
			font-size: 1.5em;
			color: #999;
			&:hover {
				color: inherit;
				margin-top: -1px;
				margin-bottom: 1px;
			}
		}
	}
	@media screen and (min-width: 600px) {
		.popup {
			display: block;
		}
	}
</style>
