/*
 * action types
 */
export const CHANGE_AUTH_MODE = 'CHANGE_AUTH_MODE';
export const TOGGLE_AUTH_MODAL = 'TOGGLE_AUTH_MODAL';
export const TOGGLE_LOGOUT = 'TOGGLE_LOGOUT';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = '';


/*
 * action creators
 */
export const toggleAuthModal = value => ({
	type: TOGGLE_AUTH_MODAL,
	value
});
export const changeAuthMode = authMode => ({
	type: CHANGE_AUTH_MODE,
	authMode,
});
export const setUser = ({ username, userId }) => ({
	type: SET_USER,
	username,
	userId,
});
export const removeUser = () => ({
	type: REMOVE_USER,
});

export const login = (loginMethod, data) => async (dispatch) => {
	try {
		const userObj = await loginMethod(data);
		dispatch(setUser(userObj));
		dispatch(toggleAuthModal(false));
	} catch (err) {
		throw err;
	}
};

export const logout = logoutMethod => async (dispatch) => {
	try {
		await logoutMethod();
		dispatch(removeUser());
		dispatch(toggleAuthModal(false));
	} catch (err) {
		throw err;
	}
};
