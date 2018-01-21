import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import LinkButtonDialog from './LinkButtonDialog';

describe('LinkButtonDialog', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<LinkButtonDialog
					open={false}
					handleClose={() => {}}
					handleAddLink={() => {}}
					handleRemoveLink={() => {}}
					onValueChange={() => {}}
				/>
			</MuiThemeProvider>
		);
		expect(wrapper).toBeDefined();
	});
});
