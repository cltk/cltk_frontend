
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import WorkDetail from './WorkDetail';

describe('WorkDetail', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<WorkDetail
					work={{
						author: 'Test author',
						title: 'Test Work',
						editor: 'Editor',
						year: '0',
					}}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
