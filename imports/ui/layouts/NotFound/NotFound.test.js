import React from 'react';
import renderer from 'react-test-renderer';

// component:
import NotFound from './NotFound';


jest.mock('material-ui/List/ListItem');

describe('NotFound', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<NotFound isTest />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
