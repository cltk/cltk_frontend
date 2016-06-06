ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    textNodes: React.PropTypes.array.isRequired
  },

  renderText() {

    return this.props.textNodes.map((text, i) => {

        let showNumber = false;
        let numbering = "";

        if(text.n_3) {
          if(i==0){
            showNumber = true;
          }
          else{
            showNumber = this.props.textNodes[i-1].n_2 != text.n_2;
          }
          if(showNumber) {
            numbering = text.n_1 + "." + text.n_2;
          }
        } else if(text.n_2) {
          if(i==0){
            showNumber = true;
          }
          else{
            showNumber = this.props.textNodes[i-1].n_1 != text.n_1;
          }
          if(showNumber) {
            numbering = (text.n_1).toString();
          }
        }

        return <ReadingText
                  key={text._id}
                  showNumber={showNumber}
                  text={text}
                  numbering={numbering}
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

          {this.renderText()}

  				<div className="reading-loading-area">
  					<div className="well-spinner"></div>
  				</div>


        </div>

    );

  }

});
