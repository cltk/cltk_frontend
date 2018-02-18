
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import WorkTeaser from './WorkTeaser';

jest.mock('material-ui/internal/Tooltip');

describe('WorkTeaser', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<MuiThemeProvider>
				<WorkTeaser
					work={{
						_id: {
							_str: 'testId',
						},
						slug: 'test',
						isInShelf: false,
						authors: [],
					}}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
