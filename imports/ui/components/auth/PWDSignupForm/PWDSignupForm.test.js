import React from 'react';
import renderer from 'react-test-renderer';

// component:
import PWDSignupForm from './PWDSignupForm';

describe('PWDSignupForm', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<PWDSignupForm />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
