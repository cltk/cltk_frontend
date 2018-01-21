import React from 'react';
import renderer from 'react-test-renderer';


// component:
import AnnotateWidget from './AnnotateWidget';

describe('AnnotateWidget', () => {
	it('renders correctly', () => {

		const tree = renderer
			.create(
				<AnnotateWidget
					annotationCheckList={[]}
					work={{
						title: 'test',
						slug: 'test',
					}}
				/>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
