
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import TextMetaOptions from './TextMetaOptions';

jest.mock('material-ui/internal/Tooltip');

describe('TextMetaOptions', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<TextMetaOptions />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
