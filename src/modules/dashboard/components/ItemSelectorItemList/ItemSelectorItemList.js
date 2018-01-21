import React from 'react';
import PropTypes from 'prop-types';


import ItemSelectorItemListItem from '../ItemSelectorItemListItem';

import './ItemSelectorItemList.css';


const ItemSelectorItemList = ({ items, toggleSelectedItem }) => {
	return (
		<div className="itemSelectorItemList">
			{items.map((listItem, i) => (
				<ItemSelectorItemListItem
					key={`${listItem.slug}-${i}`}
					toggleSelectedItem={toggleSelectedItem}
					{...listItem}
				/>
			))}
		</div>
	);
};

ItemSelectorItemList.propTypes = {
	showSelected: PropTypes.bool,
	items: PropTypes.array,
	selectedItems: PropTypes.array,
	toggleSelectedItem: PropTypes.func,
};

ItemSelectorItemList.defaultProps = {
	items: [],
	selectedItems: [],
};

export default ItemSelectorItemList;
