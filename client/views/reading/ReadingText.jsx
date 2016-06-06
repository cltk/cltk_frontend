ReadingText = React.createClass({

  propTypes: {
    text: React.PropTypes.object.isRequired,
    showNumber: React.PropTypes.bool.isRequired,
    numbering: React.PropTypes.string.isRequired,
  },

  getInitialState(){

    return {
      bookmarked: false,
      showRelatedPassages: false,
      showEntities: false

    };

  },

  toggleBookmarked(){
    this.setState({
      bookmarked: ! this.state.bookmarked

    });
  },

  toggleShowEntities(){
    this.setState({
      showEntities: ! this.state.showEntities

    });
  },

  toggleShowRelatedPassages(){
    this.setState({
      showRelatedPassages: ! this.state.showRelatedPassages

    });
  },

  render() {
    let text = this.props.text;
    let text_n = "";
    let textClasses = "text-wrap";
    let numbering = this.props.numbering;
    
    if (this.props.showNumber){
      textClasses = textClasses + " show-number";
    }

    if (this.state.bookmarked){
      textClasses = textClasses + " text-bookmarked";
    }

    if (this.state.showEntities){
      textClasses = textClasses + " show-entities";
    }

    if (this.state.showRelatedPassages){
      textClasses = textClasses + " show-related-passages";
    }

    if (text.n_3 !== null){
        text_n = text.n_3;
    }else if (text.n_2 !== null){
        text_n = text.n_2;
    }else{
        text_n = text.n_1;
    }

    return(
       <div className={textClasses}>
         <div className="text-left-header">
            <h2>{numbering}</h2>
            <i className="text-bookmark mdi mdi-bookmark"></i>
         </div>

          <p className="text-html" dangerouslySetInnerHTML={{__html: text.html}}>
          </p>

          <div className="text-meta-options">
            <div className="text-meta-option text-meta-option-bookmark" onClick={this.toggleBookmarked}>
              <i className="mdi mdi-bookmark"></i>
              <span className="option-label">Bookmark</span>
            </div>

            <div className="text-meta-option text-meta-option-entities" onClick={this.toggleShowEntities}>
              <i className="mdi mdi-account"></i>
              <span className="option-label">Entities</span>
            </div>

            <div className="text-meta-option text-meta-option-related-passages" onClick={this.toggleShowRelatedPassages}>
              <i className="mdi mdi-share-variant"></i>
              <span className="option-label">Related Passages</span>
            </div>

            <div className="text-meta-option text-meta-option-other-options" >
              <i className="mdi mdi-dots-horizontal"></i>
            </div>

          </div>

          <div className="text-meta text-related-passages">
            <div className="related-passage">
              <span className="related-passage-edition">1920, A. S. F. Gow</span>
              <a href="#" className="related-passage-ref paper-link">
                <h4 >Theocritus, Idylls 17.2-3</h4>
              </a>
              <div className="related-passage-lemma">
                <p>ἄλλοκα δ’ αὖ ποτὶ τὸν ῥιπτεῖ νόον· οἳ δ’ ὑπ’ ἔρωτος</p>
                <p>δηθὰ κυλοιδιόωντες ἐτώσια μοχθίζοντι.</p>

              </div>

            </div>

          </div>
          <div className="text-meta text-entities">
            <div className="entity-teaser">
              <a href="#" className="entity-thumbnail-image image-wrap paper-shadow">
                <img src="/images/entities/herodotus_thumbnail.jpg"/>
              </a>
              <div className="entity-description">
                <a href="#" className="entity-name ">
                  <h4 >Herodotus</h4>
                </a>
                <span className="entity-bio">Herodotus was a Greek historian who was born in Halicarnassus, Caria and lived in the 5th century BC, a contemporary of Socrates ... </span>

                <div className="entity-meta">
                  <a href="#" className="entity-meta-link entity-additional-refernces entity-action md-button md-ink-ripple">
                    <span>76 other references</span>
                    <div className="md-ripple-container"></div>
                  </a>
                  <a href="#" className="entity-meta-link entity-media entit-action md-button md-ink-ripple">
                    <span>8 associated media</span>
                    <div className="md-ripple-container"></div>
                  </a>

                </div>
              </div>

            </div>
            <div className="entity-teaser">
              <a href="#" className="entity-thumbnail-image image-wrap paper-shadow">
                <img src="/images/entities/halicarnassus_thumbnail.jpg"/>
              </a>
              <div className="entity-description">
                <a href="#" className="entity-name ">
                  <h4 >Halicarnassus</h4>
                </a>
                <span className="entity-bio">Halicarnassus was an ancient Greek city at the site of modern Bodrum in Turkey. It is located in southwest Caria on a picturesque ... </span>

                <div className="entity-meta">
                  <a href="#" className="entity-meta-link entity-additional-refernces entity-action md-button md-ink-ripple">
                    <span>24 other references</span>
                    <div className="md-ripple-container"></div>
                  </a>
                  <a href="#" className="entity-meta-link entity-media entit-action md-button md-ink-ripple">
                    <span>3 associated media</span>
                    <div className="md-ripple-container"></div>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      );
  }
});
