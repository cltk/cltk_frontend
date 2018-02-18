import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import AnnotationsList from './AnnotationsList';

describe('AnnotationsList', () => {
	it('renders correctly', () => {

		const wrapper = shallow(
			<MuiThemeProvider>
				<AnnotationsList
					text={{
						_id: {
							_str: 'testId',
						},
					}}
					/>
			</MuiThemeProvider>
			);
		expect(wrapper).toBeDefined();
	});
});
