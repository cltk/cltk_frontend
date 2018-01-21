import React from 'react';

import './FileDetails.css';


const FileDetails = ({ file }) => (
	<div
		className="fileDetails"
	>
		<div className="fileDetailsTitleInput">
			<input
				type="text"
				placeholder="Enter file title . . ."
				defaultValue={file.title}
			/>
		</div>
	</div>
);

export default FileDetails;
