
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchFilters from './SearchFilters';

describe('SearchFilters', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<SearchFilters
					filters={[]}
					toggleSearchTerm={() => {}}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
