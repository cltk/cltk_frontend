import React from 'react';
import renderer from 'react-test-renderer';

// component:
import UserLayout from './UserLayout';

jest.mock('material-ui/List/ListItem');


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
