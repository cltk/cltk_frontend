import React from 'react';
import renderer from 'react-test-renderer';


// component:
import AnnotateWidget from './AnnotateWidget';

describe('AnnotateWidget', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(<AnnotateWidget />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
