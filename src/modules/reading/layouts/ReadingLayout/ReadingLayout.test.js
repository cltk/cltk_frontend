import React from 'react';
import renderer from 'react-test-renderer';

// component:
import ReadingLayout from './ReadingLayout';

describe('ReadingLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<ReadingLayout
					params={{}}
					queryParams={{}}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
