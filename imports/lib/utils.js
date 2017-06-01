const Utils = {
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
	trunc: (str, length) => {
		const ending = '...';
		let trimLen = length;

		if (trimLen == null) {
			trimLen = 100;
		}

		if (str.length > trimLen) {
			return str.substring(0, trimLen - ending.length) + ending;
		}

		return str;
	},
	defaultCmp: function(a, b) {
		if (a == b) return 0;
		return a < b ? -1 : 1;
	},
	getCmpFunc: (primer, reverse) => {
		let dfc = Utils.defaultCmp;
		let cmp = Utils.defaultCmp;
		if (primer) {
			cmp = (a, b) => {
				return dfc(primer(a), primer(b));
			};
		}
		if (reverse) {
			return (a, b) => {
				return -1 * cmp(a, b);
			};
		}
		return cmp;
	},
	sortBy: function () {
		const fields = [];
		const nFields = arguments.length;
		let field;
		let name;
		let reverse;
		let cmp;

		// preprocess sorting options
		for (let i = 0; i < nFields; i++) {
			field = arguments[i];

			if (typeof field === 'string') {
				name = field;
				cmp = Utils.defaultCmp;
			} else {
				name = field.name;
				cmp = Utils.getCmpFunc(field.primer, field.reverse);
			}
			fields.push({
				name,
				cmp,
			});
		}

		// final comparison function
		return (A, B) => {
			let a;
			let b;
			let name;
			let result;

			for (let i = 0; i < nFields; i++) {
				result = 0;
				field = fields[i];
				name = field.name;

				result = field.cmp(A[name], B[name]);
				if (result !== 0) break;
			}
			return result;
		};
	},
};

export default Utils;
