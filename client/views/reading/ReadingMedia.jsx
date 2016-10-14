import FlatButton from 'material-ui/FlatButton';

ReadingMedia = React.createClass({

	propTypes: {
	},

	render() {
		return (
			<div className="embedded-media">
				<div className="media-outer">
					<img alt="thumbnail" src="/images/aeneid-demo-image-2.png" />
					<FlatButton
						className="show-in-viewer-button"
						label="Image Viewer"
						icon={<i className="mdi mdi-magnify" />}
					/>
				</div>
				<div className="media-description">
					<span className="media-caption">
						"Folio 45V". <em>The Vergilius Vaticanus
						</em>. Vatican, Biblioteca Apostolica, Cod. Vat. lat. 3225). Rome, Italy. Ca 400 AD.
					</span>

				</div>

			</div>
		);
	},
});
