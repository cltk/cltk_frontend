
ReadingLayout = React.createClass({
	getInitialState(){
	    return {
	      toggleCommentary: false,
	      toggleDefinitions: false,
	      toggleTranslations: false
	    }
	},
	toggleSidePanel(metadata){
		console.log(metadata);
		if(metadata==="definitions"){
			let toggle = !this.state.toggleDefinitions;
			this.setState({
				toggleDefinitions: toggle
			});
			console.log("toggleDefinitions" + this.state.toggleDefinitions);
		}
		if(metadata==="commentary"){
			let toggle = !this.state.toggleCommentary;
			this.setState({
				toggleCommentary: toggle
			});
		}
		if(metadata==="translations"){
			let toggle = !this.state.toggleTranslations;
			this.setState({
				toggleTranslations: toggle
			});
		}
	},
	render(){
		return(
			<div className="cltk-layout reading-layout">
				<HeaderReading toggleSidePanel={this.toggleSidePanel} toggleDefinitions={this.state.toggleDefinitions}
					toggleCommentary={this.state.toggleCommentary} toggleTranslations={this.state.toggleTranslations} />
				<main>
					{this.props.content}
				</main>

				<div className="reading-loading-area">
					<div className="well-spinner"></div>
				</div>

				<AnnotateWidget />

				<DefinitionsPanel toggleDefinitions={this.state.toggleDefinitions} />

				<CommentaryPanel toggleCommentary={this.state.toggleCommentary} toggleTranslations={this.state.toggleTranslations} />

				
			</div>
			);
	}

});
