import React from 'react';
import { shallow } from 'enzyme';

import AboutPage from './AboutPage';

describe('AboutPage', () => {
	it('renders', () => {
		const wrapper = shallow(<AboutPage />);

		expect(wrapper).toBeDefined();
	});
});
