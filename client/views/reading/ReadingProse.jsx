ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    text: React.PropTypes.array.isRequired
  },

  renderText() {

    return this.props.text.map((text, i) => {

        let showNumber = false;
        if(text.n%5 === 0){
          showNumber = true;
        }

        return <ReadingText
                  key={text._id}
                  showNumber={showNumber}
                  text={text}
                  />;

      });

  },


  render() {
    let work = this.props.work;

    return (
        <div className="reading-container">

          <div className="author-wrap">
            <h3 className="work-author">
              {work.author}
            </h3>
          </div>

          <div className="title-wrap">
            <h1 className="work-title">{work.title}</h1>
          </div>

          <div className="chapter-heading">
              <h3 className="chapter-number"></h3>
          </div>

          {this.renderText()}



        </div>

    );

  }

});
