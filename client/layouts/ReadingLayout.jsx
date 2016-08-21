
ReadingLayout = React.createClass({

	// This mixin makes the getMeteorData method work
	mixins: [ReactMeteorData],

	propTypes: {
		params: React.PropTypes.object.isRequired,
		queryParams: React.PropTypes.object.isRequired
	},

  getInitialState(){
    return {
      toggleCommentary: false,
      toggleDefinitions: false,
      toggleTranslations: false,
      filters: [],
			location: [],
			skip: 0,
			limit: 30 
    };
  },

	getMeteorData() {
		let query = {};
		let textNodes = [];

		let work = Works.findOne({_id: this.props.params.id});


		if(work){

			// Get the work authors
			work.authors = Authors.find({ _id : {$in: work.authors} }).fetch()

			/*
			 * Should be the slug when the text sync / ingest is reworked
			 */
			//query = {work: work.slug};
			query = {work: work.title};

			let handle = Meteor.subscribe('textNodes', query, this.state.skip, this.state.limit);
	    if(handle.ready()) {
		    textNodes = Texts.find({}, {}).fetch();
			}

		}else {
			console.log("Reading query: work not available for _id", this.props.params.id)
		}



		return {
			work: work,
			textNodes: textNodes,
			currentUser: Meteor.user()
		};

	},

	loadMore(){
	    this.setState({
	      skip : this.state.skip + this.state.limit
	    });

			console.log("Load more:", this.state);
	},

	toggleSidePanel(metadata){
		if(metadata==="definitions"){
			let toggle = !this.state.toggleDefinitions;
			this.setState({
				toggleDefinitions: toggle
			});
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

	renderReadingEnvironment(){
		let work = this.data.work;
		let textNodes = this.data.textNodes;
		// If data is loaded
		if(work && textNodes){

			// Infer Reading layout by the work meta structure value
			if(['line', 'poem-line', 'book-line'].indexOf(work.structure)){
				// Render reading poetry here instead of Prose
	      return (
	          <ReadingProse
	            work={work}
	            textNodes={textNodes}
							loadMore={this.loadMore}
	            highlightId={this.props.queryParams.id} />
	        );

	    }else {
	      return (
	          <ReadingProse
	            work={work}
	            textNodes={textNodes}
							loadMore={this.loadMore}
	            highlightId={this.props.queryParams.id} />
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
					work={this.data.work}
					location={this.state.location}
					toggleSidePanel={this.toggleSidePanel}
					toggleDefinitions={this.state.toggleDefinitions}
					toggleCommentary={this.state.toggleCommentary}
					toggleTranslations={this.state.toggleTranslations}
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
					work={this.props.params.work}
					textNodes={this.data.textNodes} />

			</div>
			);
	}

});
