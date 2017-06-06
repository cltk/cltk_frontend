import React from 'react';

import PropTypes from 'prop-types';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Works from '/imports/api/collections/works';

class BookmarkedTextNode extends React.Component {
	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	getTextLocation() {
		const { text } = this.props;
		let location = '';
		let textN = '';

		if ('n_1' in text) {
			location += text.n_1;
			textN = text.n_1;
		}
		if ('n_2' in text) {
			location += `.${text.n_2}`;
			textN = text.n_2;
		}
		if ('n_3' in text) {
			location += `.${text.n_3}`;
			textN = text.n_3;
		}
		if ('n_4' in text) {
			location += `.${text.n_4}`;
			textN = text.n_4;
		}
		if ('n_5' in text) {
			location += `.${text.n_5}`;
			textN = text.n_5;
		}

		return {
			location,
			textN,
		};
	}

	handleClick() {

	}


	render() {
		const { text } = this.props;
		let textClasses = 'text-node bookmark-text-node clearfix';
		const textLocation = this.getTextLocation();
		let workTitle = '';
		let link = '';

		if (this.props.work) {
			workTitle = this.props.work.english_title;
			link = `/works/${this.props.work._id}/${this.props.work.slug}?location=${textLocation.location}`;
		}

		if (this.props.isOdd) {
			textClasses = `${textClasses} bookmark-text-node--odd`;
		}

		if ((parseInt(textLocation.textN, 10) % 5) === 0) {
			textClasses = `${textClasses} show-number`;
		}

		return (
			<a
				className={textClasses}
				data-id={text._id}
				data-loc={textLocation.location}
				href={link}
			>
				<div className="text-left-header">
					<h2 className="section-numbering">{Utils.trunc(workTitle, 40)} {textLocation.location}</h2>
				</div>

				<p
					className="text-html"
					ref={(ref) => {
						this.anchorEl = ref;
						return ref;
					}}
				>
					{text.text && text.text .length ?
						<span>{Utils.trunc(text.text, 120)}</span>
					:
						<span>[ . . . ]</span>
					}
				</p>

			</a>
		);
	}
};

BookmarkedTextNode.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

BookmarkedTextNode.propTypes = {
	text: PropTypes.shape({
		work: PropTypes.object.isRequired,
	}).isRequired,
	isOdd: PropTypes.bool,
};

const BookmarkedTextNodeContainer = createContainer(function(props) {
	const query = { _id: props.text.work };
	const handleWorks = Meteor.subscribe('works', query);
	const work = Works.findOne(query);

	return {
		work,
	};
}, BookmarkedTextNode);

export default BookmarkedTextNodeContainer;
