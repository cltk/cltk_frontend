import React from 'react';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import ImagesUploader from '../ImagesUploader';
import ImagesInput from '../ImagesInput';

export default class FormImagesUploader extends React.Component {
	constructor(props) {
		super(props);
		this.addImage = this.addImage.bind(this);
		this.updateImage = this.updateImage.bind(this);
	}

	addImage(file) {
		this.props.imagesFormState.fields.push(file);
	}

	updateImage(index, image) {
		this.props.imagesFormState.fields.remove(index);
		this.props.imagesFormState.fields.insert(index, image);
	}

	showError(event) {

	}

	render() {
		const imagesFormState = this.props.imagesFormState;
		return (
			<div>
				<SortableList
					images={imagesFormState}
					onSortEnd={({oldIndex, newIndex}) => {
						imagesFormState.fields.move(oldIndex, newIndex);
					}}
					updateImage={this.updateImage}
					showError={this.props.showError}
					useDragHandle
				/>
				<ImagesUploader addImage={this.addImage} />
			</div>
		);
	}
}
const SortableItem = SortableElement(({image, imageIndex, removeImage, updateImageCb, showError}) =>
  (<ImagesInput
	image={image}
	imageIndex={imageIndex}
	key={`image-key-${image.name}`}
	updateImageCb={updateImageCb}
	deleteImage={removeImage}
	showError={showError}
  />)
);

const SortableList = SortableContainer(({images, updateImage, showError}) => (
	<div>
		{images.fields.getAll().map((image, index) => (<SortableItem
			image={image}
			index={index}
			imageIndex={index}
			key={`image-key-${image.name}`}
			updateImageCb={updateImage}
			removeImage={() => {
				images.fields.remove(index);
			}}
			showError={showError}
		/>
    ))}
	</div>
));
