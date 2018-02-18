import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import AnnotationTextNode from './AnnotationTextNode';

describe('AnnotationTextNode', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<AnnotationTextNode
					annotation={{
						_id: 'testId',
					}}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
