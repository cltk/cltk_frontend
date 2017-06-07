
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import HeaderReading from './HeaderReading';

jest.mock('material-ui/List/ListItem');

describe('HeaderReading', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<HeaderReading
						work={{
							_id: 'testId',
							slug: 'slug',
							english_title: 'english_title',
							authors: [],
						}}
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
