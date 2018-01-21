import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchTools from './SearchTools';

jest.mock('material-ui/FlatButton/FlatButton');
jest.mock('material-ui/TextField/TextField');

describe('SearchTools', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<SearchTools
						filters={[]}
						isTest
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
