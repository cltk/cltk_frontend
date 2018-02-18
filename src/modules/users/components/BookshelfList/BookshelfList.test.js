import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import BookshelfList from './BookshelfList';

describe('BookshelfList', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<BookshelfList />
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
