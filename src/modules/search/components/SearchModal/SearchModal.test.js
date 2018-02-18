
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchModal from './SearchModal';

describe('SearchModal', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<SearchModal
					works={[]}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
