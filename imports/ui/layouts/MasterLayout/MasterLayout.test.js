import React from 'react';
import renderer from 'react-test-renderer';

// component:
import MasterLayout from './MasterLayout';

jest.mock('material-ui/List/ListItem');

describe('MasterLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<MasterLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
