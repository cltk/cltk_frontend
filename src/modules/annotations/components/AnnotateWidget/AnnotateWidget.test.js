import React from 'react';
import { shallow } from 'enzyme';


// component:
import AnnotateWidget from './AnnotateWidget';

describe('AnnotateWidget', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<AnnotateWidget
				annotationCheckList={[]}
				work={{
					title: 'test',
					slug: 'test',
				}}
				/>
			);
		expect(wrapper).toBeDefined();
	});
});
