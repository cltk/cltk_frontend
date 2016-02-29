ReadingText = React.createClass({

  propTypes: {
    text: React.PropTypes.object.isRequired
  },

  render() {
    let text = this.props.text;
      return(
       <div className="text-wrap">
          <div className="text-html" dangerouslySetInnerHTML={{__html: text.html}}>
          </div>

          <div className="text-meta-options">
            <div className="text-meta-option">
              <i className="mdi mdi-bookmark"></i>
              <span className="option-label">Bookmark</span>
            </div>

            <div className="text-meta-option">
              <i className="mdi mdi-account"></i>
              <span className="option-label">Entities</span>
            </div>

            <div className="text-meta-option">
              <i className="mdi mdi-share-variant"></i>
              <span className="option-label">Related Passages</span>
            </div>

            <div className="text-meta-option">
              <i className="mdi mdi-dots-horizontal"></i>
              <span className="option-label"></span>
            </div>


          </div>

      </div>

    );
  }
});
