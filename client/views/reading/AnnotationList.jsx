AnnotationList = React.createClass({

	propTypes: {
		annotationList: React.PropTypes.array.isRequired,
	},

	renderAnnotations() {
		return this.props.annotationList.map((annotation, i) => {
			const isOwner = Meteor.userId() === annotation.user;
			return <AnnotationItem
				key={i}
				annotation={annotation}
				isOwner={isOwner} />
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
