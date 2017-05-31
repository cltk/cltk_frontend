import React from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class AnnotationTextNode extends React.Component {
	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	getTextLocation() {
		const text = this.data.text;
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
		//const text = this.props.text;
		const annotation = this.props.annotation;
		let textClasses = 'text-node bookmark-text-node annotation-text-node clearfix';
		// const textLocation = this.getTextLocation();
		const textLocation = '';
		let workTitle = '';
		let link = '';

		if (this.data.work) {
			workTitle = this.data.work.english_title;
			link = `/works/${this.data.work._id}/${this.data.work.slug}?location=${textLocation.location}`;
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
				data-id={annotation._id}
				//data-loc={textLocation.location}
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
					{annotation.content && annotation.content.length ?
						<span>{annotation.content}</span>
					:
						<span>[ . . . ]</span>
					}
				</p>

			</a>
		);
	}
};

AnnotationTextNode.childContextTypes = {
	muiTheme: PropTypes.object.isRequired,
};

AnnotationTextNode.propTypes = {
	annotation: PropTypes.object.isRequired,
	isOdd: PropTypes.bool,
};

const AnnotationTextNodeContainer = createContainer(props => {
	let work = null;
	/*
	const query = { _id: text.work };
	const handleWorks = Meteor.subscribe('works', query);
	work = Works.findOne(query);
	*/

	return {
		work,
	};
}, AnnotationTextNode);

export default AnnotationTextNodeContainer;
