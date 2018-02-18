
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import UserBookmarksList from './UserBookmarksList';

describe('UserBookmarksList', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<UserBookmarksList />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
