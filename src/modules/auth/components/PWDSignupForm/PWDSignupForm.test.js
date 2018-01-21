import React from 'react';
import { shallow } from 'enzyme';

// component
import PWDSignupForm from './PWDSignupForm';

describe('PWDSignupForm', () => {
	it('renders correctly', () => {

		const wrapper = shallow(<PWDSignupForm />);
		expect(wrapper).toBeDefined();
	});
});
