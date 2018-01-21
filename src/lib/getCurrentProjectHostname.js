

const getCurrentProjectHostname = () => {
	let hostname = null;
	const cltkHostnames = ['cltk.org', 'cltk.local', 'localhost'];

	if (
		window
		&& window.location.hostname
		&& !~cltkHostnames.indexOf(window.location.hostname)
	) {
		hostname = window.location.hostname;
	}

	// regularlize development domain
	if (hostname && hostname.endsWith('cltk.local')) {
		hostname = hostname.replace('cltk.local', 'cltk.org');
	}

	return hostname;
};

export default getCurrentProjectHostname;
