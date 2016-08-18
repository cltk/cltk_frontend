import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
import Bookmark from 'material-ui/svg-icons/action/bookmark';
import BookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import Done from 'material-ui/svg-icons/action/done';
import {red500, yellow500, blue700} from 'material-ui/styles/colors';
import Popover from 'material-ui/Popover';

ReadingText = React.createClass({

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.object.isRequired,
    showNumber: React.PropTypes.bool.isRequired,
    numbering: React.PropTypes.string.isRequired,
    addAnnotationCheckList: React.PropTypes.func.isRequired,
    annotationCheckList: React.PropTypes.array.isRequired,
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    let annotationList = [];
    let bookmarked = false;
    let handleAnnotation = Meteor.subscribe('annotation');
    let handleBookmark = Meteor.subscribe('bookmark');
    if(handleAnnotation.ready()) {
      annotationList = Annotation.find({textNodes: this.props.text._id}).fetch();
    }
    if(handleBookmark.ready()) {
      let bookmarkList = Meteor.users.findOne({},{fields: {'bookmarks': 1}});
      if(bookmarkList && bookmarkList.bookmarks) {
        // Check if current textNode exist in bookmarked textNodes
        bookmarked = bookmarkList.bookmarks.indexOf(this.props.text._id) != -1;
      }
    }
    return {
      annotationList: annotationList,
      bookmarked: bookmarked
    }
  },

  getInitialState(){

    return {
      bookmarked: false,
      showRelatedPassages: false,
      showEntities: false,
    };

  },

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
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

  handleClick(event) {
    translation = $('.translation-text[data-num="'+ this.props.index + '"]');
    if(translation.length != 0) {
      $(".translations").scrollTo(translation, { duration:800 });
    }
    comment = $('.commentary-comment[data-num="'+ this.props.index + '"]').first();
    if(comment.length != 0) {
      $(".comments").scrollTo(comment, { duration:400 });
    }
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      annotationOpen: true,
      anchorEl: event.currentTarget
    });
  },

  addAnnotationCheckList(event, isChecked) {
    if (typeof this.props.addAnnotationCheckList === 'function') {
      this.props.addAnnotationCheckList(this.props.text._id, isChecked);
    }
  },

  toggleBookmark(event, isChecked) {
    if(isChecked) {
      Meteor.call('bookmark.insert', this.props.text._id);
    }
    else {
      Meteor.call('bookmark.remove', this.props.text._id);
    }
  },

  handleRequestClose() {
    this.setState({
      annotationOpen: false,
    });
  },

  renderAnnotations() {
    return this.data.annotationList.map((annotation, i) => {
        return <AnnotationItem
          key={i}
          annotation={annotation} />
      });
  },

  render() {
    const styles = {
      checkbox: {
        display: "inline-block",
        width: "auto"
      },
    };
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

    if (this.data.annotationList.length != 0){
      textClasses = textClasses + " text-annotated";
      if (this.state.annotationOpen){
        textClasses = textClasses + " annotation-shown";
      }
    }

    if (text.n_3 !== null){
        text_n = text.n_3;
    }else if (text.n_2 !== null){
        text_n = text.n_2;
    }else{
        text_n = text.n_1;
    }

    return(
        <div className={textClasses} data-num={this.props.index}>
          <div className="text-left-header">
            <h2>{numbering}</h2>
            <i className="text-bookmark mdi mdi-bookmark"></i>
          </div>
          {Meteor.userId() ?
            <div className="text-meta-actions">
              <Checkbox
                title="Bookmark"
                onCheck={this.toggleBookmark}
                checked={this.data.bookmarked}
                checkedIcon={<Bookmark />}
                uncheckedIcon={<BookmarkBorder />}
                style={styles.checkbox}
              />
              <Checkbox
                title="Select for annotation"
                onCheck={this.addAnnotationCheckList}
                // Check if current textNode exist in annotation checklist
                checked={this.props.annotationCheckList.indexOf(text._id) != -1}
                checkedIcon={<Done color={blue700}/>}
                uncheckedIcon={<Done />}
                style={styles.checkbox}
              />
            </div> : null
          }
          <Popover
            open={this.state.annotationOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{"horizontal":"right","vertical":"top"}}
            targetOrigin={{"horizontal":"left","vertical":"top"}}
            onRequestClose={this.handleRequestClose}>
              <AnnotationList annotationList={this.data.annotationList} />
          </Popover>
          <p className="text-html" onClick={this.handleClick}>
            <span dangerouslySetInnerHTML={{__html: text.html}}></span>
          </p>

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
                  <a href="#" className="entity-meta-link entity-additional-refernces entity-action ">
                    <span>76 other references</span>
                  </a>
                  <a href="#" className="entity-meta-link entity-media entit-action ">
                    <span>8 associated media</span>
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
                  <a href="#" className="entity-meta-link entity-additional-refernces entity-action ">
                    <span>24 other references</span>
                  </a>
                  <a href="#" className="entity-meta-link entity-media entity-action ">
                    <span>3 associated media</span>
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      );
  }
});
ReadingText.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
