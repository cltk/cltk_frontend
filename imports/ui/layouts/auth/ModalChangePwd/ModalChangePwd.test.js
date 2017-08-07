import React from 'react';
import renderer from 'react-test-renderer';

// component:
import ModalChangePwd from './ModalChangePwd';

describe('ModalChangePwd', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<ModalChangePwd />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
