import React from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl from 'react-mapbox-gl';


import './ItemMetaField.css';


const ItemMetaField = ({ type, label, value }) => {


	const Map = ReactMapboxGl({
		accessToken: 'pk.eyJ1IjoibHVrZWhvbGxpcyIsImEiOiJ6Rk1vdjc0In0.jQDtXA8wqU_wYi5p1ClCyw',
		scrollZoom: false,
	});

	let elem = null;
	switch (type) {
	case 'text':
		elem = (
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	case 'number':
		elem = (
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	case 'date':
		elem = (
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	case 'place':
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
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	case 'item':
		elem = (
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	default:
		elem = (
			<div className="itemMetaField">
				<label>{label}</label>
				<span>{value}</span>
			</div>
		);
		break;
	}

	return elem;
}

ItemMetaField.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
};


export default ItemMetaField;
