import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';

import ItemSelectorItemList from '../../components/ItemSelectorItemList';
import itemsQuery from '../../../items/graphql/queries/list';


class ItemSelectorItemListContainer extends React.Component {
	render() {
		const { selectedItems } = this.props;
		let items = [];

		if (
			this.props.itemListQuery
			&& this.props.itemListQuery.project
		) {
			items = this.props.itemListQuery.project.items.slice();
		}

		// don't show the items that are common between lists
		selectedItems.forEach(selectedItem => {
			items.forEach(item => {
				if (item._id === selectedItem._id) {
					items.splice(
						items.findIndex( _i => _i._id === item._id),
						1
					);
				}
			});
		});


		return (
			<ItemSelectorItemList
				items={items}
				selectedItems={selectedItems}
				toggleSelectedItem={this.props.toggleSelectedItem}
			/>
		);
	}
}

ItemSelectorItemListContainer.propTypes = {
	toggleSelectedItem: PropTypes.func.isRequired,
	selectedItems: PropTypes.array,
};

ItemSelectorItemListContainer.defaultProps = {
	selectedItems: [],
};

export default compose(
	itemsQuery,
)(ItemSelectorItemListContainer);
