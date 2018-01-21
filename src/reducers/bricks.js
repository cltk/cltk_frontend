import * as types from '../actions/bricks';

export default (state = [], action) => {
	switch (action.type) {
	case types.IMAGES_LOADED:
		return {
			...state,
			loaded: action.loaded,
		};
	default:
		return state;
	}
};
