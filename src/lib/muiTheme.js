import {
  grey300,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator';

export default {
	palette: {
		primary1Color: '#5D4037',
		primary2Color: '#795548',
		primary3Color: '#D7CCC8',
		accent1Color: '#63232D',
		accent2Color: '#56282F',
		accent3Color: '#331310',
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: grey300,
		disabledColor: fade(darkBlack, 0.3),
		pickerHeaderColor: '#63232D',
		clockCircleColor: fade(darkBlack, 0.07),
		shadowColor: fullBlack,
	},
};
