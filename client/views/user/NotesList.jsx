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
			},
			innerList: {
				maxHeight: 250,
				overflow: "auto",
			},
			list: {
				margin: 0,
			},
		};
		return (
			<ul className="collection with-header" style={styles.list}>
				<li className="collection-header"> <h3>Annotations</h3></li>
				<div style={styles.innerList}>
				{this.data.annotatedText.map(function(annotation, i){
					return (
						<li key={i} className="collection-item"  style={styles.listItem}>
							<a href={"/works/" + annotation.author + "/" + annotation.work + "?id=" + annotation.textNodes[0]}>
								{annotation.content}
							</a>
						</li>
					)

		        })}
		        </div>
			</ul>
		);
	}

});
