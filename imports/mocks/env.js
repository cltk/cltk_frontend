import $ from 'jquery';

global.$ = global.jQuery = $;

$.fn.ionRangeSlider = () => {};

window.matchMedia = window.matchMedia || function matchMedia() {
	return {
		matches: false,
		addListener: () => {},
		removeListener: () => {}
	};
};
