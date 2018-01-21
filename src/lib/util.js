
export default {
	timeSince: (date) => {
		let interval;
		const seconds = Math.floor((new Date() - date) / 1000);
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
	},
	trunc: (str, length) => {
		const ending = ' ...';
		let trimLen = length;
		str = str.replace(/<(?:.|\n)*?>/gm, '');

		if (trimLen == null) {
			trimLen = 100;
		}

		if (str.length > length) {
			return str.substring(0, length - ending.length) + ending;
		}

		return str;
	},

	isMobile: () => {
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},
	capitalize: (str) => {
		const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
		return capitalized;
	},
};
