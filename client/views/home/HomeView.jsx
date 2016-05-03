HomeView = React.createClass({

  componentDidMount() {

    var options, w, winHeight, winWidth;
    w = new WOW().init();
    winWidth = $(window).width();
    winHeight = $(window).height();

    $("#intro").css({
      width: winWidth,
      height: winHeight
    });

    $(window).resize(function() {
      return $("#intro").css({
        width: $(window).width(),
        height: $(window).height()
      });
    });

    if (!Utils.isMobile) {
      options = {
        forceHeight: false,
        smoothScrolling: false
      };
      return skrollr.init(options).refresh();
    }

  },

  render(){
      return (
        <div>
          <section id="intro" className="cover fullscreen image-bg bg-dark ">

              <div className="background-image-holder less-blur blur">
                <img src="/images/column.jpg" alt="image" />
              </div>
              <div className="background-screen cyan">
              </div>

              <div className="container v-align-transform header-container">
                  <div className="row">

                      <div className="header-center text-center">

                          <h1>Explore open classical literature</h1>
                          <input className="header-search" type="text" placeholder="Search . . ." />

                          <h6 className="uppercase mb16">Read classical works in Greek, Latin, Chinese, Coptic, and Pali <br/>  and research metadata on your favorite texts.</h6>

                          <a className="btn btn-large md-button learn-more-button md-ink-ripple paper-shadow" href="#beliefs" aria-label="Learn More">
                            <span>Learn More</span>
                            <div className="md-ripple-container"></div>

                          </a>


                      </div>


                  </div>

              </div>

          </section>

          <section id="get-started" className="bg-gray" >
            <div className="container text-center">
              <div className="row">
                <h2 className="section-title">Get Started </h2>
                <hr className="section-header-line" />
                <h4 className="uppercase" >Browse popular authors, poets, and historians</h4>

              </div>
            </div>


            <div className="container text-center">
              <div className="row">
                <a href="#" className="btn btn-lg md-button md-ink-ripple view-more paper-shadow" aria-label="View more">
                  View more
                </a>
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
                    Authors with works included quid faciat laetas segetes quo sidere terram vertere
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
                    Texts available to read quid faciat laetas segetes quo sidere terram vertere
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
                    Named entities annotated quid faciat laetas segetes quo sidere terram vertere
                </span>

              </div>

            </div>


          </section>

          <section id="build" >
            <div className="container text-center">

              <div className="row">

                <h2 className="section-title">Create or Contribute</h2>

                <hr className="section-header-line" />
              </div>
              <div className="row">


                <div className="col-sm-6 text-center">

                  <a href="https://github.com/cltk/cltk_frontend" target="_blank" className="start-building-item">
                    <i className="mdi mdi-github-circle icon-lg mb40 mb-xs-24 "></i>
                    <h5 className="uppercase">Create your own archive</h5>
                    <span className="item-text">Quid faciat laetas segetes quo sidere terram vertere Mycenas ulmisque adiungere vites conveniat</span>

                  </a>
                </div>
                <div className="col-sm-6 text-center">

                <a href="/about#contribute" target="_blank" className="start-building-item">
                  <i className="mdi mdi-email-outline icon-lg mb40 mb-xs-24  "></i>
                  <h5 className="uppercase">Contribute</h5>
                  <span className="item-text">Quid faciat laetas segetes quo sidere terram vertere Mycenas ulmisque adiungere vites conveniat</span>
                </a>

                </div>

              </div>
            </div>

          </section>
    </div>

    );
  }
});
