import React from 'react';
import renderer from 'react-test-renderer';

// component:
import BaseLayout from './BaseLayout';

jest.mock('material-ui/List/ListItem');

describe('BaseLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<BaseLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
