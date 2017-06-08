import React from 'react';
import renderer from 'react-test-renderer';

// component:
import LoadingPage from './LoadingPage';

describe('LoadingPage', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<LoadingPage />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
