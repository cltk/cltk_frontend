
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import WorkTeaser from './WorkTeaser';

describe('WorkTeaser', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<WorkTeaser
						work={{
							_id: {
								_str: 'testId',
							},
							slug: 'test',
							isInShelf: false,
						}}
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
