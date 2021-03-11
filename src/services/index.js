/* eslint-disable class-methods-use-this */
import injector from 'vue-inject';
import mojs from 'mo-js';

if (!window.__PRERENDER_INJECTED) { // eslint-disable-line

	class Heart extends mojs.CustomShape {
		getShape() {
			return `<path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489
		48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532
		0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766
		52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0
		73.6170213,0 L73.6170213,0 Z"></path>`;
		}
	}
	mojs.addShape('heart', Heart);

	const burst = new mojs.Burst({
		className: 'heart-burst',
		radius: {
			20: 100
		},
		count: 7,
		opacity: {
			1: 0.7
		},
		duration: 1500,
		children: {
			shape: 'heart',
			fill: '#d33',
			duration: 1000,
			isSwirl: true,
			delay: 'rand(0, 500)',
			pathScale: 'rand(0.5, 1)',
			radius: 'rand(12, 15)',
			swirlSize: 'rand(10, 15)',
			angle: 0,
			easing: 'cubic.out',
		}
	});

	injector.constant('heartBurst', burst);
}
