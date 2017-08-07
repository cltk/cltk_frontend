import React from 'react';
import renderer from 'react-test-renderer';

// component:
import ModalLogin from './ModalLogin';

describe('ModalLogin', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<ModalLogin />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
