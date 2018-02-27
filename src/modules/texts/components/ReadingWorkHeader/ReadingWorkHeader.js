import React from 'react';
import PropTypes from 'prop-types';

class ReadingWorkHeader extends React.Component {

	render() {
		const { englishTitle, originalTitle } = this.props;

		return (
			<div className="readingWorkHeader">
				<h1 className="work-title">
					{englishTitle}
				</h1>
				{originalTitle ?
					<span className="work-original-title">
						{originalTitle}
					</span>
					:
					''
				}
			</div>
		);
	}
}

ReadingWorkHeader.propTypes = {
	author: PropTypes.object.isRequired,
	englishTitle: PropTypes.string.isRequired,
	originalTitle: PropTypes.string.isRequired,
};

export default ReadingWorkHeader;
