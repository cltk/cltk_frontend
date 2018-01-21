import React from 'react';
import { shallow } from 'enzyme';

// component:
import OAuthButtons from './OAuthButtons';

describe('OAuthButtons', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<OAuthButtons
				login={() => {}}
			/>
		);
		expect(wrapper).toBeDefined();
	});
});
