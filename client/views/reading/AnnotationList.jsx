AnnotationList = React.createClass({

	propTypes: {
		textNodeId: React.PropTypes.string.isRequired,
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		let handle = Meteor.subscribe('annotation');
		let annotationList = [];
		if(handle.ready()){
			annotationList = Annotation.find({textNodes: this.props.textNodeId}).fetch();
		}
		return {
			annotationList: annotationList,
		}
	},
	renderAnnotations() {
		return this.data.annotationList.map((annotation, i) => {
	      return <AnnotationItem
	        key={i}
	        annotation={annotation} />
	    });
	},

	render() {
		return (
			<div>
				{this.renderAnnotations()}
			</div>
		);
	}

});
