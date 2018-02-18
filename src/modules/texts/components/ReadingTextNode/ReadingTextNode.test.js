
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import ReadingTextNode from './ReadingTextNode';

jest.mock('material-ui/internal/Tooltip');

describe('ReadingTextNode', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<ReadingTextNode
					text={{
						_id: 'testId',
					}}
					annotations={[]}
					relatedPassages={[]}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
