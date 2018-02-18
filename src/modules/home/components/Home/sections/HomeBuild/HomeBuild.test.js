
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import HomeBuild from './HomeBuild';

describe('HomeBuild', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<HomeBuild />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
