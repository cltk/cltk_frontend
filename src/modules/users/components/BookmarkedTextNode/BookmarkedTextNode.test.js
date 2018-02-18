import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import BookmarkedTextNode from './BookmarkedTextNode';

describe('BookmarkedTextNode', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<MuiThemeProvider>
				<BookmarkedTextNode
					text={{}}
				/>
			</MuiThemeProvider>
		);
		expect(wrapper).toBeDefined();
	});
});
