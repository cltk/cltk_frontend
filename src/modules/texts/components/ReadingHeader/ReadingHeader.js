import React from 'react';

// components
import ReadingHeaderNavBar from './ReadingHeaderNavBar';
import LeftMenu from '../../../../components/navigation/LeftMenu';

const ReadingHeader = ({ work }) => (
	<div>
		<LeftMenu />
		<ReadingHeaderNavBar
			work={work}
		/>
	</div>
);

export default ReadingHeader;
