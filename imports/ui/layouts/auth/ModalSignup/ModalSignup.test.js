import React from 'react';
import renderer from 'react-test-renderer';

// component:
import ModalSignup from './ModalSignup';

describe('ModalSignup', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<ModalSignup />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
