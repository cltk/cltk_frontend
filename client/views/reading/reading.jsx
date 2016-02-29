Reading = React.createClass({

  propTypes: {

  },


  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {};

    return {
      text : {
        genre : "prose"
      }
    };

  },


  renderReadingEnvironment(){

    if (this.data.text.genre === "poetry"){
      return (
          <ReadingPoetry
            key={this.data.text._id}
            text={this.data.text} />
        );

    }else {
      return (
          <ReadingProse
            key={this.data.text._id}
            text={this.data.text} />
        );

    }


  },


  render() {
    let text = this.data.text;
    return(
      <div className="reading-environment book-chapter-section">
        {this.renderReadingEnvironment()}

      </div>

    )
  }

});
