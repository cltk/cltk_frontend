import { TOGGLE_LEFT_MENU } from '../actions/leftMenu';

export default (state = [], action) => {
	switch (action.type) {
	case TOGGLE_LEFT_MENU:
		return {
			...state,
			open: action.open,
		};
	default:
		return state;
	}
};
