import React from 'react';
import renderer from 'react-test-renderer';

// component:
import AuthForm from './AuthForm';

describe('AuthForm', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<AuthForm />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
