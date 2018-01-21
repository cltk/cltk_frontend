import React from 'react';
import PropTypes from 'prop-types';

import './ItemDescription.css';

const ItemDescription = ({ description }) => (
	<p className="itemDescription">
		{description}
	</p>
);

ItemDescription.propTypes = {
	description: PropTypes.string,
};

ItemDescription.defaultProps = {
	description: ''
};


export default ItemDescription;
