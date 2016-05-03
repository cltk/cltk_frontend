
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
      <div class="page page-search">

    		<section class="page-head fullscreen image-bg bg-dark">

    			<div class="background-image-holder blur">
    				<img class="background-image" alt='image' src='/images/bronze-characters.jpg'/>
          </div>

          <div class="background-screen">
          </div>

    			<div class="container v-align-transform">
    				<div class="row">
    					<div class="col-sm-10 col-sm-offset-1 text-center">
    					  <h1 class="mb40 mb-xs-16 large">
                  Search
                </h1>
              </div>
            </div>

          </div>

        </section>

    		<section class="page-content">
          {this.renderWorks}

        </section>


      </div>
    );
  }
});
