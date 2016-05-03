// Single work detail view
WorkDetail = React.createClass({

  propTypes: {
    work : React.PropTypes.object.isRequired
  },

  render() {
    let work = this.props.work;

    return (
            <div>
              <section className="page-head image-bg bg-dark">

                  <div className="background-image-holder less-blur blur">
                    <img src="/images/bronze-characters.jpg" alt="image" />
                  </div>
                  <div className="background-screen">
                  </div>

                  <div className="container v-align-transform header-container">
                      <div className="row">

                          <div className="col-sm-12 left">

                            <a href="/">
                              <h3 className="work-author">{work.author}</h3>
                            </a>

                            <a href="/">
                              <h2 className="card-title work-title">{work.title}</h2>
                            </a>
                            <a href="/">
                              <p className="work-editor">{work.editor}, {work.year}</p>
                            </a>


                          </div>
                          <div className="col-sm-12 right text-right">

                            <a href="#" className="comments-action md-button md-ink-ripple">
                              <i className="mdi mdi-comment-outline"></i>227
                              <div className="md-ripple-container"></div>
                            </a>

                            <a href="#" className="favorite-action md-button md-ink-ripple">
                              <i className="mdi mdi-star-outline"></i>32
                              <div className="md-ripple-container"></div>
                            </a>

                            <a href="#" className="export-action md-button md-ink-ripple">
                              Export
                              <i className="mdi mdi-export"></i>
                              <div className="md-ripple-container"></div>
                            </a>

                          </div>

                      </div>

                  </div>

              </section>

              <section className="work-details">

                  <div className="container ">
                      <div className="row">
                        <p>Work description lorem ipsum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                        </p>



                      </div>

                  </div>

              </section>


          </div>
        );
      }
  });
