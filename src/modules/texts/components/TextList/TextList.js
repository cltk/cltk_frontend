import React from 'react';
import PropTypes from 'prop-types';

import TextListItemContainer from '../../containers/TextListItemContainer';

import './TextList.css';


const TextList = ({ texts }) => (
	<div className="textsList">
		{texts.map((listItem, i) => (
			<TextListItemContainer
				key={`${listItem.slug}-${i}`}
				{...listItem}
			/>
		))}

		{!texts || !texts.length ?
			<div className="textsListNoResults">
				<p>
					There are no texts for this project yet.
				</p>
			</div>
		: ''}
	</div>
);

TextList.propTypes = {
	texts: PropTypes.array,
};

TextList.defaultProps = {
	texts: [],
};

export default TextList;
