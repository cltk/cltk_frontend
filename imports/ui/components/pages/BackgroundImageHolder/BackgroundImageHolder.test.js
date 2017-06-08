import React from 'react';
import renderer from 'react-test-renderer';

// component:
import BackgroundImageHolder from './BackgroundImageHolder';

describe('BackgroundImageHolder', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<BackgroundImageHolder imgSrc="test" />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
