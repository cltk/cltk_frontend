AnnotationList = React.createClass({

	propTypes: {
		annotationList: React.PropTypes.array.isRequired,
	},

	renderAnnotations() {
		return this.props.annotationList.map((annotation, i) => {
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
