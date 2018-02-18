import React from 'react';


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
				{props.annotatedText && props.annotatedText.map((annotation, i) => (
					<div>
						{/*
							TODO: Annotation text node
						*/}
					</div>
				))}
			</div>
		</ul>
	);
};

export default UserAnnotationsList;
