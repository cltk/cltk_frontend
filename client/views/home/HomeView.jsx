

HomeView = React.createClass({

  componentDidMount() {

    /*
     * Init wow animations on homepage
     */
    var w;
    w = new WOW().init();

  },

  render(){
      return (
        <div>
          <section id="intro" className="cover fullscreen image-bg bg-dark ">

              <div className="background-image-holder less-blur blur">
                <img src="/images/column.jpg" alt="image" />
              </div>
              <div className="background-screen light">
              </div>

              <div className="container v-align-transform header-container">
                  <div className="row">

                      <div className="header-center text-center">

                          <h1>Explore open classical literature</h1>
                          <input className="header-search" type="text" placeholder="Search . . ." />

                          <h6 className="uppercase mb16">Read classical works in Greek, Latin, Chinese, Coptic, and Pali <br/>  and research metadata on your favorite texts.</h6>

                          <a className="waves-effect waves-light btn-large" href="#beliefs" aria-label="Learn More">Learn More</a>


                      </div>


                  </div>

              </div>

          </section>

          <section id="get-started" className="bg-gray" >
            <div className="container text-center">
              <div className="row">
                <h2 className="section-title">Get Started </h2>
                <hr className="section-header-line" />
                <h4 className="uppercase" >Browse the archive's authors, poets, and historians</h4>

              </div>
            </div>

            <WorksList />


            <div className="container text-center">
              <div className="row">
                <a className="waves-effect waves-light btn-large" aria-label="View more">View more</a>
              </div>
            </div>
          </section>

          <section id="features" >

            <div className="feature f1">
              <div className="feature-image-screen"></div>
              <div className="feature-inner">

                <h3 className="feature-n">137</h3>
                <span className="feature-title">Authors</span>

                <div className="feature-line"></div>

                <span className="feature-desc">
                    Classical authors with books and works included in the archive
                </span>

              </div>

            </div>
            <div className="feature f2">
              <div className="feature-image-screen"></div>
              <div className="feature-inner">

                <h3 className="feature-n">482</h3>
                <span className="feature-title">Texts</span>

                <div className="feature-line"></div>

                <span className="feature-desc">
									Texts in multiple languages, with metadata, criticism, and commentary
                </span>

              </div>

            </div>
            <div className="feature f3">
              <div className="feature-image-screen"></div>
              <div className="feature-inner">

                <h3 className="feature-n">1,427</h3>
                <span className="feature-title">Entities</span>

                <div className="feature-line"></div>

                <span className="feature-desc">
                    Named entities annotated in text and linked to public datasets
                </span>

              </div>

            </div>


          </section>

          <section id="build" >
            <div className="container text-center">

              <div className="row">

                <h2 className="section-title">Contribute code to the CLTK Core or Archive</h2>

                <hr className="section-header-line" />
              </div>
              <div className="row">


                <div className="col-sm-6 text-center">
	                <a href="https://github.com/cltk/cltk" target="_blank" className="start-building-item">
	                  <i className="mdi mdi-github-circle icon-lg mb40 mb-xs-24  "></i>
	                  <h5 className="uppercase">Code the CLTK Core NLP package</h5>
	                  <span className="item-text">Help push forward what's possible with study of classical languages by developing the CLTK core natural language processing library</span>
	                </a>

                </div>
                <div className="col-sm-6 text-center">

                  <a href="https://github.com/cltk/cltk_frontend" target="_blank" className="start-building-item">
                    <i className="mdi mdi-github-circle icon-lg mb40 mb-xs-24 "></i>
                    <h5 className="uppercase">Build the CLTK Archive</h5>
                    <span className="item-text">Contribute code, thoughts, or ideas to the CLTK Archive's public reading interface and annotation environment</span>

                  </a>

                </div>

              </div>
            </div>

          </section>
    </div>

    );
  }
});
