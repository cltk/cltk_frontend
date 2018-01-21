import React from 'react';
import PropTypes from 'prop-types';

import NoResults from '../../../../components/pagination/NoResults';
import ItemListItem from '../ItemListItem';

import './ItemList.css';


const ItemList = ({ items, horizontal }) => {
	const classes = [];


	if (horizontal) {
		classes.push('itemListHorizontal');
	}

	return (
		<div className={`itemList ${classes.join(' ')}`}>
			{items.map((listItem, i) => (
				<ItemListItem
					key={`${listItem.slug}-${i}`}
					{...listItem}
				/>
			))}

			{!items || !items.length ?
				<NoResults
					message="No items have been added to this collection yet."
				/>
			: ''}
		</div>
	);
};

ItemList.propTypes = {
	items: PropTypes.array,
};

ItemList.defaultProps = {
	items: [],
};

export default ItemList;
