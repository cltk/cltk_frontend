WorksList = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
  },

  getMeteorData() {
    let query = {};

    return {
      works: Works.find(query, {sort: {author: 1, title: 1}}).fetch(),
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
				 {this.renderWorks()}
       </div>


      );
    }


});
