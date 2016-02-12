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
              <h3 class="work-author">{this.work.author}</h3>
            </a>

            <a href="/works/histories/1">
              <h2 class="card-title work-title">{this.work.title}</h2>
            </a>

            <hr/>

            <a href="/">
              <p class="work-editor">{this.work.editor}, {this.work.year}</p>
            </a>

          </md-card-content>

          <md-card-actions class="clearfix" >

            <a href="#" class="comments-action md-button md-ink-ripple">
              <i class="mdi mdi-comment-outline"></i>227
              <div class="md-ripple-container"></div>
            </a>

            <a href="#" class="favorite-action md-button md-ink-ripple">
              <i class="mdi mdi-star-outline"></i>32
              <div class="md-ripple-container"></div>
            </a>

            <a href="#" class="export-action md-button md-ink-ripple">
              Export
              <i class="mdi mdi-export"></i>
              <div class="md-ripple-container"></div>
            </a>

          </md-card-actions>

        </md-card>

      );
    }

});
