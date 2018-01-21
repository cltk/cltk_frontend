import React from 'react';
import renderer from 'react-test-renderer';

// component:
import MenuItem from './MenuItem';

describe('MenuItem', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<MenuItem />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
