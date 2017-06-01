import React from 'react';
import renderer from 'react-test-renderer';

// component:
import MasterLayout from './MasterLayout';

describe('MasterLayout', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<MasterLayout />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
