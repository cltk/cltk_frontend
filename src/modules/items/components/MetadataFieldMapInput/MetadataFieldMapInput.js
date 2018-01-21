import React from 'react';
import autoBind from 'react-autobind';
import Map, { Marker } from 'google-maps-react';


import './MetadataFieldMapInput.css';

class MetadataFieldMapInputContent extends React.Component {

	constructor(props) {
		super(props);

		autoBind(this);
		this.state = {
			place: null,
			position: null,
			autocomplete: '',
		};
	}

	onSubmit(e) {
		e.preventDefault();
	}

	componentDidMount() {
		this.renderAutoComplete();
	}

	componentDidUpdate(prevProps) {
		const { map } = this.props;
		if (map !== prevProps.map) {
			this.renderAutoComplete();
		}
	}

	renderAutoComplete() {
		const { google, map } = this.props;

		if (!google || !map) return;

		var autocomplete = new google.maps.places.Autocomplete(this.state.autocomplete);
		autocomplete.bindTo('bounds', map);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();
			if (!place.geometry) {
				return;
			}

			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(17);
			}

			this.setState({
				place: place,
				position: place.geometry.location
			})
		})
	}

	handleChangeAutocomplete(e) {
		this.setState({
			autocomplete: e.value,
		});
	}

	render() {
		const props = this.props;
		const { position } = this.state;

		return (
			<div className="metadataFieldMapInput">
				<input
					type="text"
					placeholder="Enter a location"
					onChange={this.handleChangeAutocomplete}
				/>
				<button
					className="metadataFieldMapInputTextSubmit"
				>
					Select
				</button>
				<div>
					<div>
						Lat: {position && position.lat()}
					</div>
					<div>
						Lng: {position && position.lng()}
					</div>
				</div>
				<Map
					{...props}
					containerStyle={{
						position: 'relative',
						height: '100vh',
						width: '100%'
					}}
					center={this.state.position}
					centerAroundCurrentLocation={false}
				>
					<Marker position={this.state.position} />
				</Map>
			</div>
		)
	}
}

const MetadataFieldMapInput = props => (
	<Map
		google={props.google}
		className="metadataFieldMapInput"
		visible={false}
	>
		<MetadataFieldMapInputContent {...props} />
	</Map>
);

export default MetadataFieldMapInput;
