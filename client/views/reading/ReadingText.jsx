ReadingText = React.createClass({

  propTypes: {
    text: React.PropTypes.object.isRequired,
    showNumber: React.PropTypes.bool.isRequired,
  },

  getInitialState(){

    return {
      bookmarked: false

    };

  },

  toggleBookmarked(){
    this.setState({
      bookmarked: ! this.state.bookmarked

    });
  },

  render() {
    let text = this.props.text;
    let textClasses = "text-wrap";

    if (this.props.showNumber){
      textClasses = textClasses + " show-number";
    }

    if (this.state.bookmarked){
      textClasses = textClasses + " text-bookmarked";
    }

    return(
       <div className={textClasses}>
         <div className="text-left-header">
           <span className="text-n">{text.n}</span>
            <i className="text-bookmark mdi mdi-bookmark"></i>
         </div>

          <div className="text-html" dangerouslySetInnerHTML={{__html: text.html}}>
          </div>

          <div className="text-meta-options">
            <div className="text-meta-option" onClick={this.toggleBookmarked}>
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

          <div className="text-meta text-related-passages">
            <div className="related-passage">
              <span className="related-passage-edition">1920, A. S. F. Gow</span>
              <a href="#" className="related-passage-ref">
                <h4 >Theocritus, Idylls 17.2-3</h4>
              </a>
              <div className="related-passage-lemma">
                <p>ἄλλοκα δ’ αὖ ποτὶ τὸν ῥιπτεῖ νόον· οἳ δ’ ὑπ’ ἔρωτος</p>
                <p>δηθὰ κυλοιδιόωντες ἐτώσια μοχθίζοντι.</p>
                
              </div>

            </div>

          </div>
          <div className="text-meta text-entities">
            <div className="entity">
              <div className="entity-thumnail-image image-wrap">
                <img src="/images/entities/herodotus_thumbnail.jpg"/>
              </div>
              <div className="entity-description">
                <h4 className="related-passage-ref">Herodotus</h4>
                <p>Herodotus was a Greek historian who was born in Halicarnassus, Caria ...</p>
                <a href="#" className="entity-read-more">Read more</a>
              </div>

            </div>

          </div>

        </div>

      );
  }
});
