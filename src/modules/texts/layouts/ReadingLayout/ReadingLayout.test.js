import React from 'react';
import { shallow } from 'enzyme';

// component:
import ReadingLayout from './ReadingLayout';

describe('ReadingLayout', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<ReadingLayout
				params={{}}
				queryParams={{}}
				/>
			);
		expect(wrapper).toBeDefined();
	});
});
