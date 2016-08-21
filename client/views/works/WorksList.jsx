WorksList = React.createClass({

  mixins: [ReactMeteorData],

  propTypes: {
  },

  getMeteorData() {
    let query = {};

		let works = Works.find(query, {sort: {'author.english_name': 1, 'english_title': 1}}).fetch();

		works.forEach(function(work){
			work.authors = Authors.find({ _id : {$in: work.authors} }).fetch()
		});

    return {
      works: works
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
       <div className="works-list">
				 {this.renderWorks()}
       </div>


      );
    }


});
