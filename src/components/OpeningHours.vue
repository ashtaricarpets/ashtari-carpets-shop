<template>
	<div>
		<h3 v-translate>Opening Hours</h3>
		<p class="openorclosed">
			<translate class="opened" v-if="opened">We are now open</translate>
			<translate class="closed" v-else>We are now closed</translate>
		</p>
		<table class="table is-fullwidth opening-hours-table">
			<tbody>
			<tr v-for="day in days" :key="day.day" :class="{ today: currentDay === day.day }">
				<td>{{ $gettext(day.day) }}</td>
				<td colspan="3" v-if="day.hours === 'closed'">
					<translate>closed</translate>
				</td>
				<td v-else>{{ day.hours }}</td>
			</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	const weekday = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	export default {
		data() {
			return {
				days: [
					{ day: 'Monday', hours: 'closed' },
					{ day: 'Tuesday', hours: '10:00 - 18:00' },
					{ day: 'Wednesday', hours: '10:00 - 18:00' },
					{ day: 'Thursday', hours: '10:00 - 18:00' },
					{ day: 'Friday', hours: '10:00 - 18:00' },
					{ day: 'Saturday', hours: '10:00 - 18:00' },
					{ day: 'Sunday', hours: 'closed' },
				],
				currentDay: undefined,
				opened: false,
				intervalId: undefined,
			};
		},
		mounted() {
			const self = this;
			this.intervalId = setInterval(() => {
				self.now = new Date();
				this.currentDay = weekday[(new Date()).getDay()];
				const { hours } = this.days.find(d => d.day === this.currentDay);
				if (hours === 'closed') {
					self.opened = false;
				} else {
					const open = hours.split(' - ')[0];
					const close = hours.split(' - ')[1];
					const currentTime = [`0${self.now.getHours()}`.slice(-2), `0${self.now.getMinutes()}`.slice(-2)].join(':');
					if (currentTime >= open && currentTime <= close) {
						self.opened = true;
					} else {
						self.opened = false;
					}
				}
			}, 1000);
		},
		destroyed() {
			clearInterval(this.intervalId);
		}
	};
</script>

<style lang="scss" scoped>
	$danger: red;
	$primary: #A08641;
	$link: $primary;
	$success: #2B854A;

	.table {
		color: white;

		td:first-child {
			padding-left: 0;
		}
	}


	.opened {
		color: lighten($success, 20);
	}
	.closed {
		color: lighten($danger, 20);
	}
	.today {
		color: lighten($primary, 20);
	}

</style>
