import React from 'react';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';

class TextMetaOptions extends React.Component {

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
	}
}

TextMetaOptions.propTypes = {
	toggleBookmark: PropTypes.func.isRequired,
	toggleShowAnnotations: PropTypes.func.isRequired,
	toggleShowRelatedPassages: PropTypes.func.isRequired,
	annotationsCount: PropTypes.number,
	relatedPassagesCount: PropTypes.number,
};

export default TextMetaOptions;
