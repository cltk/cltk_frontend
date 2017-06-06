
import React from 'react';
import renderer from 'react-test-renderer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import ReadingRelatedPassage from './ReadingRelatedPassage';

describe('ReadingRelatedPassage', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<MuiThemeProvider>
					<ReadingRelatedPassage
						relatedPassage={{
							edition: 'edition',
							authorName: 'authorName',
							englishTitle: 'englishTitle',
							location: 'location',
							textNodes: [],
						}}
					/>
				</MuiThemeProvider>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
