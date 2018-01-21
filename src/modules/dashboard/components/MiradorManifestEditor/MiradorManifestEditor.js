import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import AlertContainer from 'react-alert';
// import mongoose from 'mongoose';
// import TextInput from '../TextInput';
import { createManifest } from '../../../../lib/createManifest';
import FormImagesUploader from '../FormImagesUploader';

const validate = (values) => {
	const errors = {};
	if (!values.title) {
		errors.title = 'Required';
	}
	if (!values.label) {
		errors.label = 'Required';
	}
	if (!values.abbr) {
		errors.abbr = 'Required';
	}
	if (!values.author) {
		errors.author = 'Required';
	}
	if (!values.seeAlso) {
		errors.seeAlso = 'Required';
	}
	if (!values.attr) {
		errors.attr = 'Required';
	}
	return errors;
};

class MiradorManifestEditor extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.inputComponent = this.inputComponent.bind(this);
		this.showError = this.showError.bind(this);
		this.state = {
			images: []
		};
	}

	handleSubmit(values) {
		const manifest = values;
		// manifest._id = mongoose.Types.ObjectId();
		createManifest(manifest);
	}

	inputComponent(props) {
		return <TextInput {...props} />;
	}

	showError(error) {
		this.state.alert.show(error, {
			type: 'error'
		});
	}

	render() {
		const alertOptions = {
			offset: 14,
			position: 'bottom right',
			theme: 'light',
			time: 5000,
			transition: 'scale',
			type: 'error'
		};
		return (
			<div className="content">
				<AlertContainer ref={a => !this.state.alert && this.setState({alert: a})} {...alertOptions} />
				<div className="container">
					<form
						onSubmit={this.handleSubmit}
						validate={validate}
						form="exampleForm"
					>
						<div>
							<label htmlFor="title">Title</label>
							<Field name="title" component={this.inputComponent} type="text" placeholder="Title..." />
						</div>
						<div>
							<label htmlFor="label">Label</label>
							<Field name="label" component={this.inputComponent} type="text" placeholder="Label..." />
						</div>
						<div>
							<label htmlFor="abbr">Abbreviation</label>
							<Field name="abbr" component={this.inputComponent} type="text" placeholder="Abbreviation..." />
						</div>
						<div>
							<label htmlFor="author">Author</label>
							<Field name="author" component={this.inputComponent} type="text" placeholder="Author..." />
						</div>
						<div>
							<label htmlFor="seeAlso">See Also</label>
							<Field name="seeAlso" component={this.inputComponent} type="text" placeholder="See Also..." />
						</div>
						<div>
							<label htmlFor="attribution">Attribution</label>
							<Field name="attribution" component={this.inputComponent} type="text" placeholder="Attribution..." />
						</div>
						<FieldArray
							name="images"
							component={images => (
								<FormImagesUploader imagesFormState={images} showError={this.showError} />
            )}
						/>
						<button type="submit">Submit</button>
					</form>
				</div>
			</div>
		);
	}
}


const MiradorManifestEditorForm = reduxForm({
	form: 'miradorManifestsEditor',
})(MiradorManifestEditor);

export default MiradorManifestEditorForm;
