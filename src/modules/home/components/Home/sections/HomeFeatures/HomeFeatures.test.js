
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import HomeFeatures from './HomeFeatures';

describe('HomeFeatures', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<HomeFeatures />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
