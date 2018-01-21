import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import _s from 'underscore.string';

import Tags from '../../../tags/components/Tags';

import './ItemListItem.css';


const ItemListItem = (props) => {
	const itemUrl = `/items/${props._id}/${props.slug}`;

	let files = [];
	let imageUrl = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		imageUrl = `//iiif.cltk.org/${files[0].name}/full/300,/0/default.jpg`;
	}

	return (
		<div className="itemListItem">
			{imageUrl ?
				<Link to={itemUrl}>
					<img src={imageUrl} alt={props.title} />
				</Link>
			: ''}
			<Tags tags={props.tags} />
			<Link to={itemUrl}>
				<h3>{props.title}</h3>
			</Link>
			<p className="description">
				{_s.prune(props.description, 90)}
			</p>
		</div>
	);
};

ItemListItem.propTypes = {
	imageUrl: PropTypes.string,
	tags: PropTypes.array,
	title: PropTypes.string,
	slug: PropTypes.string,
	description: PropTypes.string,
};

export default ItemListItem;
