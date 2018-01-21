import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import MetadataField from '../MetadataField';
import NoResults from '../../../../components/pagination/NoResults';

import './MetadataFields.css';


const MetadataFields = ({ fields, metadata, handleUpdateMetadata }) => {

	return (
		<div className="itemEditorMetadata">
			<div className="itemEditorMetadataLabels">
				<Row>
					<Col md={2}>
						<label>Type</label>
					</Col>
					<Col md={2}>
						<label>Label</label>
					</Col>
					<Col md={7}>
						<label>Value</label>
					</Col>
					<Col md={1} />
				</Row>
			</div>
			{fields.map((field, index) => {
				let type = '';

				if (metadata) {
					metadata.forEach((metadataField, i) => {
						if (index === i) {
							type = metadataField.type;
						}
					});
				}

				return (
					<MetadataField
						key={field}
						field={field}
						index={index}
						type={type}
						handleUpdateMetadata={handleUpdateMetadata}
						handleRemove={() => fields.remove(index)}
					/>
				)
			})}

			{!fields.length ?
				<div className="itemEditorMetadataNoResults">
					<NoResults
						message="No metadata entered for this item."
					/>
				</div>
			: ''}

			<button
				className="itemEditorButton itemEditorAddMetadata"
				onClick={() => fields.push({})}
			>
				<i className="mdi mdi-plus" />
				Add metadata
			</button>
		</div>
	);
}

MetadataFields.propTypes = {
	fields: PropTypes.object,
};

export default MetadataFields;
