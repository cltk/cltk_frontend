import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('material-ui/List/ListItem');

// component:
import UserLayout from './UserLayout';

describe('UserLayout', () => {
	// test will not run while material-ui uses findDomNode;
	// see https://github.com/facebook/react/issues/7371
	it('renders correctly', () => {

		const tree = renderer
			.create(<UserLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
