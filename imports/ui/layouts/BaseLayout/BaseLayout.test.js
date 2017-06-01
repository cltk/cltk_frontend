import React from 'react';
import renderer from 'react-test-renderer';

// component:
import BaseLayout from './BaseLayout';

describe('BaseLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<BaseLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
