import React from 'react';
import { shallow } from 'enzyme';

// component
import Signup from './Signup';

describe('Signup', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<Signup
				onSigninClick={() => {}}
				signup={() => {}}
				login={() => {}}
			/>
		);
		expect(wrapper).toBeDefined();
	});
});
