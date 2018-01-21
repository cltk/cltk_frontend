import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

import CollectionCover from '../../../collections/components/CollectionCover';
import Pagination from '../../../../components/pagination/Pagination';
import ItemListContainer from '../../containers/ItemListContainer';


import './ItemListPage.css';

const ItemListPage = props => {

	let files = [];
	let coverImage = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		coverImage = _.sample(files).name;
	}


	return (
		<div >
			<CollectionCover
				title="Items"
				coverImage={coverImage}
				coverLink={props.userIsAdmin ? '/items/create' : null}
				coverLinkText={props.userIsAdmin ? 'Create new' : null}
			/>
			<ItemListContainer />
			<Pagination
				total={props.itemsCount}
				limit={18}
			/>
		</div>
	);
}

ItemListPage.propTypes = {
	userIsAdmin: PropTypes.bool,
	itemsCount: PropTypes.number,
};

ItemListPage.defaultProps = {
	userIsAdmin: false,
	itemsCount: 0,
};

export default ItemListPage;
