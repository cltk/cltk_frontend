
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import HomeIntro from './HomeIntro';

describe('HomeIntro', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<HomeIntro />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
