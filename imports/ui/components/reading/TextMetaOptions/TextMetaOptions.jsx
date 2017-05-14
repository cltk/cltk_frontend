import IconButton from 'material-ui/IconButton';

TextMetaOptions = React.createClass({

	propTypes: {
		toggleBookmark: React.PropTypes.func.isRequired,
		toggleShowAnnotations: React.PropTypes.func.isRequired,
		toggleShowRelatedPassages: React.PropTypes.func.isRequired,
		annotationsCount: React.PropTypes.number,
		relatedPassagesCount: React.PropTypes.number,
	},

	render() {
		const styles = {
			checkbox: {
				display: 'inline-block',
				width: 'auto',
			},
		};
		return (
			<div className="text-meta-options">
				<div className="text-meta-button-outer">
					<IconButton
						className="text-meta-button"
						onClick={this.props.toggleBookmark}
						style={styles.checkbox}
						iconClassName="mdi mdi-bookmark"
						tooltip="Bookmark"
						tooltipPosition="top-center"
					/>
				</div>
				<div className="text-meta-button-outer text-meta-button-outer--with-count">
					<IconButton
						className="text-meta-button"
						onClick={this.props.toggleShowAnnotations}
						style={styles.checkbox}
						iconClassName="mdi mdi-comment-text-outline"
						tooltip="Annoations"
						tooltipPosition="top-center"
					/>
					<span className="meta-count">({this.props.annotationsCount})</span>
				</div>
				<div className="text-meta-button-outer text-meta-button-outer--with-count">
					<IconButton
						className="text-meta-button"
						onClick={this.props.toggleShowRelatedPassages}
						style={styles.checkbox}
						iconClassName="mdi mdi-alpha"
						tooltip="Related Passages"
						tooltipPosition="top-center"
					/>
					<span className="meta-count">({this.props.relatedPassagesCount})</span>
				</div>
			</div>
		);
	},
});
