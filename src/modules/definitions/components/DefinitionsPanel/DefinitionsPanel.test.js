import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import DefinitionsPanel from './DefinitionsPanel';

jest.mock('material-ui/TextField/TextField');
jest.mock('react-list');

describe('DefinitionsPanel', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<DefinitionsPanel
					textNodes={[]}
					words={[]}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
