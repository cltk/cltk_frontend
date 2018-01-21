import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import { Link } from './linkDecorator';

describe('linkDecarator', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<MuiThemeProvider>
				<Link
					contentState={{
						getEntity: () => ({
							getData: () => ({
								url: 'http://test.url'
							}),
						}),
					}}
				/>
			</MuiThemeProvider>
		);
		expect(wrapper).toBeDefined();
	});
});
