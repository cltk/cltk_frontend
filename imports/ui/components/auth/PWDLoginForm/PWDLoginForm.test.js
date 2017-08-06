import React from 'react';
import renderer from 'react-test-renderer';

// component:
import PWDLoginForm from './PWDLoginForm';

describe('PWDLoginForm', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<PWDLoginForm />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
