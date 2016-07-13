import ReactList from 'react-list';

ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    textNodes: React.PropTypes.array.isRequired
  },

  getInitialState() {
    return {
      annotationCheckList: [],
    }
  },

  renderText() {
    return this.props.textNodes.map((text, index) => {
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
                key={text._id}
                index={index}
                showNumber={showNumber}
                text={text}
                numbering={numbering}
                annotationCheckList = {this.state.annotationCheckList}
                addAnnotationCheckList = {this.addAnnotationCheckList} />;
    });
  },

  scrollParentGetter() {
    return window;
  },

  addAnnotationCheckList(textNodeId, isChecked) {
    let annotationCheckList = this.state.annotationCheckList;
    if(isChecked) {
      annotationCheckList.push(textNodeId);
    }
    else {
      let index = annotationCheckList.indexOf(textNodeId);
      if(index > -1) {
        annotationCheckList.splice(index, 1);
      }
    }
    this.setState({
      annotationCheckList: annotationCheckList
    });

  },

  resetAnnotationCheckList() {
    this.setState({
      annotationCheckList: [],
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
          {Meteor.userId() ?
            <AnnotateWidget
              annotationCheckList={this.state.annotationCheckList}
              onActionCallback={this.resetAnnotationCheckList} /> : null
          }
  				<div className="reading-loading-area">
  					<div className="well-spinner"></div>
  				</div>

        </div>

    );

  }

});
