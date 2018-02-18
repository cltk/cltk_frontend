import React from 'react';
import { shallow } from 'enzyme';

// component:
import MenuItem from './MenuItem';

describe('MenuItem', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MenuItem />
			);
		expect(wrapper).toBeDefined();
	});
});
