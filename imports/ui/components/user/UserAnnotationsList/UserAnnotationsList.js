import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Annotations from '/imports/api/collections/annotations';
import AnnotationTextNode from '/imports/ui/components/user/AnnotationTextNode/AnnotationTextNode';

const styles = {
	listItem: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		font: 'normal',
	},
	innerList: {
		maxHeight: 250,
		overflow: 'auto',
	},
	list: {
		margin: 0,
	},
};

const UserAnnotationsList = props => {
	return (
		<ul className="collection with-header" style={styles.list}>
			<li className="collection-header"> <h3>Annotations</h3></li>
			<div style={styles.innerList}>
				{props.annotatedText && props.annotatedText.map((annotation, i) => {
					let textId = '';
					return (
						<AnnotationTextNode
							key={i}
							isOdd={i % 2 ? true : false}
							annotation={annotation}
						/>
				)})}
			</div>
		</ul>
	);
};

const UserAnnotationsListContainer = createContainer(props => {
	let annotatedText = [];
	const handleAnnotation = Meteor.subscribe('annotation');
	if (handleAnnotation.ready()) {
		annotatedText = Annotations.find({ user: Meteor.userId() }).fetch();
	}
	return {
		annotatedText,
	};
}, UserAnnotationsList);

export default UserAnnotationsListContainer;
