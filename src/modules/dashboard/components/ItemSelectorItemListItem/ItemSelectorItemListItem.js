import React from 'react';
import PropTypes from 'prop-types';

import './ItemSelectorItemListItem.css';


const ItemSelectorItemListItem = ({ _id, title, imageUrl, toggleSelectedItem }) => {

	return (
		<div
			className="itemSelectorItemListItem"
			onClick={toggleSelectedItem.bind(null, {
				_id,
				title,
				imageUrl,
			})}
		>
			{imageUrl ?
				<div
					className="itemThumbnail"
					style={{
						backgroundImage: `url('${imageUrl}')`,
						backgroundSize: 'cover',
					}}
				/>
			: ''}
			<h4
				className="itemSelectorItemTitle"
			>
				{title}
			</h4>
			<i className="itemSelectorItemPlus mdi mdi-plus" />
		</div>
	);
};

ItemSelectorItemListItem.propTypes = {
	imageUrl: PropTypes.string,
	tags: PropTypes.array,
	title: PropTypes.string,
	slug: PropTypes.string,
	description: PropTypes.string,
};

export default ItemSelectorItemListItem;
