import IconButton from 'material-ui/IconButton';

TextMetaOptions = React.createClass({

	propTypes: {
		toggleBookmark: React.PropTypes.func.isRequired,
		toggleShowAnnotations: React.PropTypes.func.isRequired,
		toggleShowRelatedPassages: React.PropTypes.func.isRequired,
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
					onClick={this.props.toggleShowAnnotations}
					style={styles.checkbox}
					iconClassName="mdi mdi-comment-text-outline"
					tooltip="Annoations"
					tooltipPosition="top-center"
				/>
				<IconButton
					className="text-meta-button"
					onClick={this.props.toggleShowRelatedPassages}
					style={styles.checkbox}
					iconClassName="mdi mdi-alpha"
					tooltip="Related Passages"
					tooltipPosition="top-center"
				/>
			</div>
		);
	},
});
