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
      text: Texts.find({work : work_slug}, {sort : {n_1 : 1, n_2 : 1, n_3 : 1}, limit : 20 }).fetch(),
      currentUser: Meteor.user()
    };

  },


  renderReadingEnvironment(){

    let reading = {
                  _id : 1,
                  work : this.data.work,
                  text : this.data.text
                };

    // For this stage of development, only work with prose
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
