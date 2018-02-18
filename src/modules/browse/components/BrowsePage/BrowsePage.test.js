import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import BrowsePage from './BrowsePage';

describe('BrowsePage', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<BrowsePage />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
