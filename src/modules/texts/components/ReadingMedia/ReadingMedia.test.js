
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import ReadingMedia from './ReadingMedia';

describe('ReadingMedia', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<ReadingMedia />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
