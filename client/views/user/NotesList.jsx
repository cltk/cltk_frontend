NotesList = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let annotatedText = [];
    	let handleAnnotation = Meteor.subscribe('annotation');
	    if(handleAnnotation.ready()) {
	    	annotatedText = Annotation.find({user: Meteor.userId()}).fetch();
	    }
	    return {
	    	annotatedText: annotatedText,
	    }

	},

	render() {
		styles = {
			listItem: {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				font: "normal",
			}
		};
		return (
			<ul className="collection with-header">
				<li className="collection-header"> <h3>Annotaions</h3></li>
				{this.data.annotatedText.map(function(annotation, i){
					return (
						<li key={i} className="collection-item"  style={styles.listItem}>
							<a href={"/works/" + annotation.author + "/" + annotation.work + "?id=" + annotation.textNodes[0]}>
								{annotation.content}
							</a>
						</li>
					)

		        })}
			</ul>
		);
	}

});
