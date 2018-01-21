import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import DefinitionsPanel from './DefinitionsPanel';

jest.mock('material-ui/TextField/TextField');
jest.mock('react-list');

describe('DefinitionsPanel', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<DefinitionsPanel
						textNodes={[]}
						words={[]}
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
