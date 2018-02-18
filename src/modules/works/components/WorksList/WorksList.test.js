
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import WorksList from './WorksList';

describe('WorksList', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<WorksList />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
