import FlatButton from 'material-ui/FlatButton';

ReadingMedia = React.createClass({

	propTypes: {
		mediaId: React.PropTypes.string,
	},

	mixins: [ReactMeteorData],

	getDefaultProps() {
		return {
			mediaId: '',
		};
	},

	getMeteorData() {
		const mediaSubscription = Meteor.subscribe('attachments', this.props.mediaId);
		let attachment = null;
		if (mediaSubscription.ready()) {
			attachment = Attachments.findOne({ _id: this.props.mediaId });
		}

		return {
			mediaItem: attachment,
		};
	},

	render() {
		const mediaItem = this.data.mediaItem;

		let image = {
			caption: '"Folio 45V". <em>The Vergilius Vaticanus</em>. Vatican, Biblioteca Apostolica, Cod. Vat. lat. 3225). Rome, Italy. Ca 400 AD.',
		};
		let imageUrl = '/images/aeneid-demo-image-2.png';

		/*
		if (mediaItem) {
			imageUrl = mediaItem.url();
		}
		*/

		return (
			<div className="embedded-media">
				<div className="media-outer">
					<img alt="thumbnail" src={imageUrl} />
					<FlatButton
						className="show-in-viewer-button"
						label="Image Viewer"
						icon={<i className="mdi mdi-magnify" />}
					/>
				</div>
				<div className="media-description">
					<span className="media-caption">
						{image.caption}
					</span>

				</div>

			</div>
		);
	},
});
