import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import shortid from 'shortid';

import FileUploader from '../FileUploader';
import FileThumbnail from '../FileThumbnail';


import './ItemEditorUploader.css';


class ItemEditorUploader extends React.Component {

	render() {
		const { files } = this.props;
		return (
			<div className="itemEditorUploader">
				<FileUploader addFile={this.props.addFile} />
				<div className="itemEditorUploaderThumbnailImages">
					<SortableList
						files={files}
						onSortEnd={this.onSortEnd}
						axis="xy"
						useDragHandle
						removeFile={this.props.removeFile}
						updateFile={this.props.updateFile}
					/>
				</div>
			</div>
		);
	}
}

ItemEditorUploader.defaultProps = {
	files: null,
};

const SortableItem = SortableElement(({ file, fileIndex, removeFile, updateFileCb, showError }) => (
	<FileThumbnail
		file={file}
		fileIndex={fileIndex}
		key={shortid.generate()}
		updateFileCb={updateFileCb}
		removeFile={removeFile}
		showError={showError}
	/>
));

const SortableList = SortableContainer(({ files, updateFile, showError, removeFile }) => (
	<div className="fileUploaderSortableList">
		{files.map((file, index) => (
			<SortableItem
				file={file}
				index={index}
				fileIndex={index}
				key={shortid.generate()}
				updateFileCb={updateFile}
				removeFile={removeFile}
				showError={showError}
			/>
    ))}
	</div>
));


export default ItemEditorUploader;
