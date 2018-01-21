import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { prune } from 'underscore.string';

// import Tags from '../../../tags/components/Tags';
import './TextListItem.css';

const TextListItem = (props) => {
	const textUrl = `/texts/${props._id}/${props.slug}`;
	let thumbnail = null;
	if (props.coverImage) {
		thumbnail = `http://iiif.cltk.org/${props.coverImage}/full/210,/0/default.jpg`;
	}

	if (
		!props.collection
	) {
		return null;
	}

	return (
		<div className="textListItem">
			{props.coverImage ?
				<div className="textListItemImage">
					<Link to={textUrl}>
						<img alt={props.title} src={thumbnail} />
					</Link>
				</div>
			: ''}
			<div
				className={`
					textListItemBackground
					${props.coverImage ?
						'textListItemBackgroundWithImage'
					: ''}
				`}
			>
				<div className="textCount">
					{props.itemsCount} annotations
				</div>
				<Link to={textUrl}>
					<h3>{props.collection.textGroup.work.english_title}</h3>
				</Link>
				<p>
					{prune(props.collection.textGroup.work.urn, 90)}
				</p>
				<Link
					to={textUrl}
					className="textLink"
				>
					<span className="textLinkLabel">
						View the text
					</span>
					<i className="textLinkIcon mdi mdi-chevron-right" />
				</Link>
			</div>
		</div>
	);
};

TextListItem.propTypes = {
	slug: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	coverImage: PropTypes.string,
};

TextListItem.defaultProps = {
	slug: '',
	title: '',
	description: '',
	coverImage: null,
	itemsCount: 0,
};

export default TextListItem;
