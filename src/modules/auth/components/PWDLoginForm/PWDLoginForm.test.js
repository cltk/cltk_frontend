import React from 'react';
import { shallow } from 'enzyme';

// component:
import PWDLoginForm from './PWDLoginForm';

describe('PWDLoginForm', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<PWDLoginForm />);
		expect(wrapper).toBeDefined();
	});
});
