
// List of works
SearchView = React.createClass({

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

    console.log("Works:", this.data.works);
    return this.data.works.map((work) => {
      return <WorkTeaser
              key={work._id}
              work={work} />;

    });

  },

  render() {

    return (
      <div className="page page-search">

    		<section className="page-head fullscreen image-bg bg-dark">

    			<div className="background-image-holder less-blur blur">
    				<img className="background-image" alt='image' src='/images/library-428034.jpg'/>
          </div>

          <div className="background-screen cyan">
          </div>

    			<div className="container v-align-transform">
    				<div className="row">
    					<div className="col-sm-10 col-sm-offset-1 text-center">
    					  <h1 className="mb40 mb-xs-16 large">
                  Search
                </h1>
              </div>
            </div>

          </div>

        </section>

    		<section className="page-content">
          {this.renderWorks}

        </section>


      </div>
    );
  }
});
