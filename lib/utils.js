this.Utils = {
	prettyDate(date) {
		if (date) {
			if (Config.dateFormat) {
				return moment(date).format(Config.dateFormat);
			}
			return moment(date).format('D/M/YYYY');
		}
		return null;
	},
	timeSince(date) {
		let interval;
		let seconds;
		if (date) {
			seconds = Math.floor((new Date() - date) / 1000);
			interval = Math.floor(seconds / 31536000);
			if (interval > 1) {
				return `${interval} years ago`;
			}
			interval = Math.floor(seconds / 2592000);
			if (interval > 1) {
				return `${interval} months ago`;
			}
			interval = Math.floor(seconds / 86400);
			if (interval > 1) {
				return `${interval} days ago`;
			}
			interval = Math.floor(seconds / 3600);
			if (interval > 1) {
				return `${interval} hours ago`;
			}
			interval = Math.floor(seconds / 60);
			if (interval > 1) {
				return `${interval} minutes ago`;
			}
			return 'just now';
		}
		return null;
	},
	isMobile() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
		.test(navigator.userAgent);
	},
	loginRequired() {
		return FlowRouter.go('/sign-in');
	},
	scroll_to_top() {
		return $('html,body').animate({
			scrollTop: $('body').offset().top,
		}, 500);
	},
	scroll_to_elem() {
		return $('html,body').animate({
			scrollTop: $(selector).offset().top,
		}, 500);
	},
	init_headroom() {
		const headroom = new Headroom(document.getElementById('header'));
		return headroom.init();
	},
	capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
};
