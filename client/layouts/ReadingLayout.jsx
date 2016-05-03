
ReadingLayout = React.createClass({
	render(){
		return(
			<div className="cltk-layout reading-layout">
				<HeaderReading />
				<main>
					{this.props.content}
				</main>

				<div className="reading-loading-area">
					<div className="well-spinner"></div>
				</div>

				<AnnotateWidget />

				<DefinitionsPanel />

				<CommentaryPanel />
				
			</div>
			);
	}

});
