import React from 'react';
import renderer from 'react-test-renderer';

// component:
import HomeLayout from './HomeLayout';

describe('HomeLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<HomeLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
