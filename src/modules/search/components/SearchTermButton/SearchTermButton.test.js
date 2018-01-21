
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import SearchTermButton from './SearchTermButton';

describe('SearchTermButton', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<SearchTermButton
						toggleSearchTerm={() => {}}
						label="Label"
						searchTermKey="Key"
						value="Value"
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
