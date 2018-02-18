
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import CommentaryPanel from './CommentaryPanel';

describe('CommentaryPanel', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<CommentaryPanel
					comments={[]}
					translations={[]}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
