import React from 'react';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// component:
import LinkButton from './LinkButton';


describe('LinkButton', () => {
	it('renders correctly', () => {
		const wrapper = shallow(
			<MuiThemeProvider>
				<LinkButton
					getEditorState={() => ({
						getCurrentContent: () => ({
							getEntity: () => ({
								data: {
									link: 'http://test.url',
								},
							}),
							getBlockForKey: () => ({
								getEntityAt: () => ({}),
							}),
						}),
						getSelection: () => ({
							isCollapsed: () => false,
							getStartKey: () => ({}),
							getStartOffset: () => ({}),
						}),
					})}
					setEditorState={() => {}}
					theme={{
						button: 'test',
						active: 'test',
						buttonWrapper: 'test',
					}}
				/>
			</MuiThemeProvider>
		);
		expect(wrapper).toBeDefined();
	});
});
