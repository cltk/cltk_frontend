
import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import ReadingRelatedPassage from './ReadingRelatedPassage';

describe('ReadingRelatedPassage', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
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
			);
		expect(wrapper).toBeDefined();
	});
});
