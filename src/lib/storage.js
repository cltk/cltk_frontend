export const setLocalStorageItem = (key, value) => {
	if (typeof Storage !== 'undefined') {
		localStorage.setItem(key, value);
		return value;
	}
	throw new Error('Storage not available');
};

export const getLocalStorageItem = (key) => {
	if (typeof Storage !== 'undefined') {
		return localStorage.getItem(key);
	}
	throw new Error('Storage not available');
};


export const removeLocalStorageItem = (key) => {
	if (typeof Storage !== 'undefined') {
		localStorage.removeItem(key);
		return null;
	}
	throw new Error('Storage not available');
};
