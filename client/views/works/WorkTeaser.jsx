// Work Teaser
WorkTeaser = React.createClass({

  propTypes: {
    // This component gets the work to display through a React prop.
    // We can use propTypes to indicate it is required
    work: React.PropTypes.object.isRequired
  },


  render() {
    let work = this.props.work;
    let work_url = "/works/" + work.slug + "/1";

     return (
        <md-card class="work-teaser paper-card" >

          <md-card-content>

            <a href="/">
              <h3 className="work-author">{work.author}</h3>
            </a>

            <a href={work_url}>
              <h2 className="card-title work-title">{work.title}</h2>
            </a>

            <hr/>

            <a href="/">
              <p className="work-editor">{work.editor} {work.year}</p>
            </a>

          </md-card-content>

          <md-card-actions className="clearfix" >

            <a href="#" className="comments-action md-button md-ink-ripple">
              <i className="mdi mdi-comment-outline"></i>0
              <div className="md-ripple-container"></div>
            </a>

            <a href="#" className="favorite-action md-button md-ink-ripple">
              <i className="mdi mdi-star-outline"></i>0
              <div className="md-ripple-container"></div>
            </a>

            <a href="#" className="export-action md-button md-ink-ripple">
              Other Formats
              <i className="mdi mdi-export"></i>
              <div className="md-ripple-container"></div>
            </a>

          </md-card-actions>

        </md-card>

      );
    }

});
