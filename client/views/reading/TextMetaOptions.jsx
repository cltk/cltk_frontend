

TextMetaOptions = React.createClass({

	propTypes: {
		toggleBookmark: React.PropTypes.func.isRequired,
		showAnnotations: React.PropTypes.func.isRequired,
		showRelatedPassages: React.PropTypes.func.isRequired,
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
				<IconButton
					className="text-meta-button"
					onClick={this.props.toggleBookmark}
					style={styles.checkbox}
					iconClassName="mdi mdi-bookmark"
					tooltip="Bookmark"
					tooltipPosition="top-center"
				/>
				<IconButton
					className="text-meta-button"
					onClick={this.showAnnotations}
					style={styles.checkbox}
					iconClassName="mdi mdi-comment-text-outline"
					tooltip="Annoations"
					tooltipPosition="top-center"
				/>
				<IconButton
					className="text-meta-button"
					onClick={this.showRelatedPassages}
					style={styles.checkbox}
					iconClassName="mdi mdi-alpha"
					tooltip="Related Passages"
					tooltipPosition="top-center"
				/>
			</div>
		);
	},
});
