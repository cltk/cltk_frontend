import React from 'react';
import renderer from 'react-test-renderer';

// component:
import HomeLayout from './HomeLayout';

jest.mock('material-ui/List/ListItem');

describe('HomeLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<HomeLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
