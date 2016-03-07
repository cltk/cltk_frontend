// App component - represents the whole app
WorksList = React.createClass({

  propTypes: {
  },

  renderWorks() {
    let works = [
      {
        title: "Histories",
        slug: "histories",
        author: "Herodotus",
        editor: "C. Hude",
        year: 1927
      }, {
        title: "Eclogues",
        slug: "eclogues",
        author: "Vergil",
        editor: "R. A. B. Mynors",
        year: 1913
      }, {
        title: "Georgics",
        slug: "georgics",
        author: "Vergil",
        editor: "R. A. B. Mynors",
        year: 1922
      }, {
        title: "Aeneid",
        slug: "aeneid",
        author: "Vergil",
        editor: "R. A. B. Mynors",
        year: 1901
      }, {
        title: "Iliad",
        slug: "iliad",
        author: "Homer",
        editor: "D. B. Munro",
        year: 1911
      }, {
        title: "Odyssey",
        slug: "odyssey",
        author: "Homer",
        editor: "D. B. Munro",
        year: 1924
      }, {
        title: "Idylls",
        slug: "idylls",
        author: "Theocritus",
        editor: "A. S. F. Gow",
        year: 1897
      }, {
        title: "Carmina",
        slug: "carmina",
        author: "Horace",
        editor: "A. S. F. Gow",
        year: 1913
      }, {
        title: "Epodes",
        slug: "epodes",
        author: "Horace",
        editor: "A. S. F. Gow",
        year: 1911
      }
    ];

    return works.map((work) => {
      return <WorkTeaser
              key={work._id}
              work={work} />;

    });

  },

  render() {

     return (
       <div className="works-inner">
         {this.renderWorks()}
       </div>


      );
    }


});
