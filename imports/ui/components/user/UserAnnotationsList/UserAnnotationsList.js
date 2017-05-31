import Annotations from '/imports/collections/annotations';

UserAnnotationsList = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let annotatedText = [];
		const handleAnnotation = Meteor.subscribe('annotation');
		if (handleAnnotation.ready()) {
			annotatedText = Annotations.find({ user: Meteor.userId() }).fetch();
		}
		return {
			annotatedText,
		};
	},

	render() {
		styles = {
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

		return (
			<ul className="collection with-header" style={styles.list}>
				<li className="collection-header"> <h3>Annotations</h3></li>
				<div style={styles.innerList}>
					{this.data.annotatedText.map((annotation, i) => {
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
	},

});
