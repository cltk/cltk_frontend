import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import autoBind from 'react-autobind';
import { arrayMove } from 'react-sortable-hoc';
import ReactMapboxGl from 'react-mapbox-gl';


import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import ItemSelectorField from '../../../dashboard/components/ItemSelectorField';
// import MetadataFieldMapInput from '../MetadataFieldMapInput';



class MetadataFieldValueInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			items: [],
			selectedItems: [],
		};
		autoBind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			(
				!this.state.files
			|| !this.state.files.length
			)
			&& nextProps.itemQuery
			&& nextProps.itemQuery.project
			&& nextProps.itemQuery.project.item
			&& nextProps.itemQuery.project.item.files
		) {
			this.setState({
				files: nextProps.itemQuery.project.item.files
			});
		}
	}

	addFile(file) {
		const files = this.state.files.slice();

		files.push(file);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	removeFile(index, a, b, c) {
		const files = this.state.files.slice();
		files.splice(index, 1);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	onSortEnd({ oldIndex, newIndex }) {
		const files = arrayMove(this.state.files, oldIndex, newIndex);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	updateFile(index, file) {
		const files = this.state.files.slice();

		files[index] = file;

		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	toggleSelectedItem(item) {
		const selectedItems = this.state.selectedItems.slice();

		if (selectedItems.some(selectedItem => selectedItem._id === item._id)) {
			selectedItems.splice(
				selectedItems.findIndex(selectedItem => selectedItem._id === item._id),
				1
			);
		} else {
			selectedItems.push(item);
		}

		this.setState({
			selectedItems,
		});
		this.props.handleUpdateMetadata(this.props.field, selectedItems);
	}

	handleChangeFieldMapInput(location) {
		// console.log(location);

	}

	render () {
		const { field, type, items } = this.props;

		const Map = ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibHVrZWhvbGxpcyIsImEiOiJ6Rk1vdjc0In0.jQDtXA8wqU_wYi5p1ClCyw',
			scrollZoom: false,
		});

		let elem = null;

		switch (type) {
		case 'text':
			elem = (
				<Field
					name={`${field}.value`}
					type="text"
					component="textarea"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'number':
			elem = (
				<Field
					name={`${field}.value`}
					type="number"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'date':
			elem = (
				<Field
					name={`${field}.value`}
					type="date"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'place':
			/*
			elem = (
				<MetadataFieldMapInput
					field={field}
					handleChangeFieldMapInput={this.handleChangeFieldMapInput}
				/>
			);
			*/
			elem = (
				<Map
				  style="mapbox://styles/lukehollis/cj7dnh4fb11452smw1dj34x04" // eslint-disable-line
					containerStyle={{
						height: '210px',
						width: '100%'
					}}
					center={[
						-71.1139213, 42.3741574
					]}
					zoom={[13]}
				/>
			);
			break;
		case 'media':
			elem = (
				<div>
					<ItemEditorUploader
						files={this.state.files}
						addFile={this.addFile}
						removeFile={this.removeFile}
						onSortEnd={this.onSortEnd}
						updateFile={this.updateFile}
					/>
				</div>
			);
			break;
		case 'item':
			elem = (
				<ItemSelectorField
					items={items}
					selectedItems={this.state.selectedItems}
					toggleSelectedItem={this.toggleSelectedItem}
				/>
			);
			break;
		default:
			elem = (
				<Field
					name={`${field}.value`}
					type="text"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		}

		return elem;
	}
}

MetadataFieldValueInput.propTypes = {
	field: PropTypes.string,
	type: PropTypes.string,
	items: PropTypes.array,
};

MetadataFieldValueInput.defaultProps = {
	field: null,
	type: 'text',
	items: [],
};

export default MetadataFieldValueInput;
