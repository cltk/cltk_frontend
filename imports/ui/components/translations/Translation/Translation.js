import React from 'react';
import PropTypes from 'prop-types';


class Translation extends React.Component {

	render() {
		const translationClassName = 'meta-item translation';

		return (
			<div className={translationClassName}>
				{this.props.translation.text.map((text, i) => (
					<p
						key={i} data-num={i} className="translation-text"
						dangerouslySetInnerHTML={{ __html: text }}
					/>
				))}
			</div>
		);
	}
}

Translation.propTypes = {
	translation: PropTypes.object.isRequired,
};


export default Translation;
