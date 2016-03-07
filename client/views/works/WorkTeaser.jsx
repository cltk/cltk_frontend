// Work Teaser
WorkTeaser = React.createClass({

  propTypes: {
    // This component gets the work to display through a React prop.
    // We can use propTypes to indicate it is required
    work: React.PropTypes.object.isRequired
  },


  render() {

     return (
        <md-card class="work-teaser paper-card" >

          <md-card-content>

            <a href="/">
              <h3 className="work-author">{this.props.work.author}</h3>
            </a>

            <a href="/works/histories/1">
              <h2 className="card-title work-title">{this.props.work.title}</h2>
            </a>

            <hr/>

            <a href="/">
              <p className="work-editor">{this.props.work.editor}, {this.props.work.year}</p>
            </a>

          </md-card-content>

          <md-card-actions className="clearfix" >

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

          </md-card-actions>

        </md-card>

      );
    }

});
