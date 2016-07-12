
ReadingLayout = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	propTypes: {
		params: React.PropTypes.object.isRequired,
		queryParams: React.PropTypes.object.isRequired
	},

	getMeteorData() {
		let work_query = {};
		let text_query = {};

		if("work" in this.props.params){
			work_query = {slug: this.props.params.work};
			text_query = {work: this.props.params.work};
		}


		return {
			work: Works.findOne(work_query),
			textNodes: Texts.find(text_query, {sort : {n_1 : 1, n_2 : 1, n_3 : 1}, limit : 10 }).fetch()	,
			currentUser: Meteor.user()
		};

	},

	getInitialState(){
	    return {
	      toggleCommentary: false,
	      toggleDefinitions: false,
	      toggleTranslations: false
	    }
	},

	resetScrollLock(){
		$(".definitions").scrollLock(false);
		$(".comments").scrollLock(false);
		$(".translations").scrollLock(false);
	},

	toggleSidePanel(metadata){
		this.resetScrollLock();
		if(metadata==="definitions"){
			let toggle = !this.state.toggleDefinitions;
			this.setState({
				toggleDefinitions: toggle
			});
			$(".definitions").scrollLock(true);
		}
		if(metadata==="commentary"){
			let toggle = !this.state.toggleCommentary;
			this.setState({
				toggleCommentary: toggle
			});
			$(".comments").scrollLock(true);
		}
		if(metadata==="translations"){
			let toggle = !this.state.toggleTranslations;
			this.setState({
				toggleTranslations: toggle
			});
			$(".translations").scrollLock(true);
		}
	},

	renderReadingEnvironment(){
		let work = this.data.work;
		let textNodes = this.data.textNodes;

		// If data is loaded
		if(work && textNodes){

			// Infer Reading layout by the work meta structure value
			if(['line', 'poem-line', 'book-line'].indexOf(work.structure)){
				/*
	      return (
	          <ReadingPoetry
	            work={work}
	            textNodes={textNodes} />
	        );
				*/
	      return (
	          <ReadingProse
	            work={work}
	            textNodes={textNodes} />
	        );

	    }else {
	      return (
	          <ReadingProse
	            work={work}
	            textNodes={textNodes} />
	        );

	    }

		}

	},

	render(){
		let readingClassName = "";
		if(this.state.toggleCommentary||this.state.toggleTranslations) {
			readingClassName += " with-commentary-shown";
		}
		if(this.state.toggleDefinitions) {
			readingClassName += " with-definitions-shown";
		}
		return(
			<div className="cltk-layout reading-layout">
				<HeaderReading
					toggleSidePanel={this.toggleSidePanel} toggleDefinitions={this.state.toggleDefinitions}
					toggleCommentary={this.state.toggleCommentary} toggleTranslations={this.state.toggleTranslations}
					/>

				<main>
			      <div id="reading" className={readingClassName}>
			        {this.renderReadingEnvironment()}
			      </div>
				</main>

				{/*<AnnotateWidget />*/}

				<DefinitionsPanel
					toggleDefinitions={this.state.toggleDefinitions}
					textNodes={this.data.textNodes} />

				<CommentaryPanel
					toggleCommentary={this.state.toggleCommentary}
					toggleTranslations={this.state.toggleTranslations}
					work = {this.props.params.work}
					textNodes={this.data.textNodes} />
			</div>
			);
	}

});
