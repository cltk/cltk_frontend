import ReactList from 'react-list';

ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    textNodes: React.PropTypes.array.isRequired
  },

  renderText(index, key) {

    let text = this.props.textNodes[index];
    let showNumber = false;
    let numbering = "";

    if(text.n_3) {
      if(index==0){
        showNumber = true;
      }
      else{
        showNumber = this.props.textNodes[index-1].n_2 != text.n_2;
      }
      if(showNumber) {
        numbering = text.n_1 + "." + text.n_2;
      }
    } else if(text.n_2) {
      if(index==0){
        showNumber = true;
      }
      else{
        showNumber = this.props.textNodes[index-1].n_1 != text.n_1;
      }
      if(showNumber) {
        numbering = (text.n_1).toString();
      }
    }

    return <ReadingText
              key={key}
              showNumber={showNumber}
              text={text}
              numbering={numbering}
              />;

  },

  scrollParentGetter() {
    return window;
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

          <ReactList
              itemRenderer={this.renderText}
              length={this.props.textNodes.length}
              type='variable'
              scrollParentGetter={this.scrollParentGetter}
            />

  				<div className="reading-loading-area">
  					<div className="well-spinner"></div>
  				</div>


        </div>

    );

  }

});
