
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchTermButton from './SearchTermButton';

describe('SearchTermButton', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<SearchTermButton
					toggleSearchTerm={() => {}}
					label="Label"
					searchTermKey="Key"
					value="Value"
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
