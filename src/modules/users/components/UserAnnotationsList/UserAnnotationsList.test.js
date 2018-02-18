
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import UserAnnotationsList from './UserAnnotationsList';

describe('UserAnnotationsList', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<UserAnnotationsList />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
