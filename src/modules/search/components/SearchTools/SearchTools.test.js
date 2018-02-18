import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchTools from './SearchTools';

jest.mock('material-ui/FlatButton/FlatButton');
jest.mock('material-ui/TextField/TextField');

describe('SearchTools', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<SearchTools
					filters={[]}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
