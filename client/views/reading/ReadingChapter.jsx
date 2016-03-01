ReadingChapter = React.createClass({

  propTypes: {
    chapter: React.PropTypes.object.isRequired
  },

  renderChapterText() {

    return this.props.chapter.sections.map((section, i) => {
      let showNumber = false;
      if(section.n%5 === 0){
        showNumber = true;
      }
      return <ReadingText
                key={section._id}
                showNumber={showNumber}
                text={section}
                />;

            });

  },

  render() {
    let chapter = this.props.chapter;
    return (
          <div className="chapter">
              <div className="chapter-heading">
                  <h3 className="chapter-number">{chapter.chapter_n}.</h3>
              </div>

              {this.renderChapterText()}

          </div>
        );
  }
});
