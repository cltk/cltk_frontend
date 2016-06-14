// List of works 
WorksList = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  propTypes: {
  },

  // Loads items from the Works collection and puts them on this.data.works
  getMeteorData() {
    let query = {};

    return {
      works: Works.find(query, {sort: {author: 1, title: 1}}).fetch(),
      currentUser: Meteor.user()
    };
  },

  renderWorks() {

    return this.data.works.map((work) => {
      return <WorkTeaser
              key={work._id}
              work={work} />;

    });

  },

  render() {

     return (
       <div className="works-wrap">
         {this.data.works.map((work) => {
            return <WorkTeaser
              key={work._id}
              work={work} />;
          })}
       </div>


      );
    }


});
