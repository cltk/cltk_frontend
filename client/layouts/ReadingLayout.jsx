
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
      textNodes: Texts.find(text_query, {sort : {n_1 : 1, n_2 : 1, n_3 : 1}, limit : 20 }).fetch()	,
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

  renderReadingEnvironment(){
    let genre = "prose";

		if(this.data.work && this.data.textNodes){
			debugger;

	    if (genre === "poetry"){
	      return (
	          <ReadingPoetry
	            work={this.data.work}
	            texts={this.data.textNodes} />
	        );

	    }else {
	      return (
	          <ReadingProse
	            work={this.data.work}
	            texts={this.data.textNodes} />
	        );

	    }

		}



  },


	render(){
		return(
			<div className="cltk-layout reading-layout">
				<HeaderReading
					toggleSidePanel={this.toggleSidePanel} toggleDefinitions={this.state.toggleDefinitions}
					toggleCommentary={this.state.toggleCommentary} toggleTranslations={this.state.toggleTranslations}
					/>
				<main>
		      <div className="reading-environment book-chapter-section">
		        {this.renderReadingEnvironment()}


		      </div>

				</main>

				{/*<AnnotateWidget />*/}

				<DefinitionsPanel toggleDefinitions={this.state.toggleDefinitions} />

				<CommentaryPanel toggleCommentary={this.state.toggleCommentary} toggleTranslations={this.state.toggleTranslations} />


			</div>
			);
	}

});
