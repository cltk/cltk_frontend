import React from 'react';
import { shallow } from 'enzyme';

// component:
import ModalChangePwd from './ModalChangePwd';

describe('ModalChangePwd', () => {
	it('renders correctly', () => {
		const wrapper = shallow(<ModalChangePwd />);
		expect(wrapper).toBeDefined();
	});
});
