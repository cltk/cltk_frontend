Reading = React.createClass({

  propTypes: {
  },


  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {};

    // This is only for the prototype--investigate better routing options in the future
    let work_slug = FlowRouter.current().path.split("/")[2];

    return {
      work: Works.findOne({slug : work_slug}),
      text: Texts.find({work : work_slug}, {sort : {book : 1, chapter : 1, n : 1}, limit : 10 }).fetch(),
      currentUser: Meteor.user()
    };

  },


  renderReadingEnvironment(){

    let reading = {
                  _id : 1,
                  work : this.data.work,
                  text : this.data.text
                };
    let genre = "prose";

    if (genre === "poetry"){
      return (
          <ReadingPoetry
            key={reading._id}
            work={reading.work}
            text={reading.text} />
        );

    }else {
      return (
          <ReadingProse
            key={reading._id}
            work={reading.work}
            text={reading.text} />
        );

    }


  },


  render() {
    return(
      <div className="reading-environment book-chapter-section">
        {this.renderReadingEnvironment()}

      </div>

    )
  }

});
