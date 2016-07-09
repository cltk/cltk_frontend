import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ReactList from 'react-list';

ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    textNodes: React.PropTypes.array.isRequired
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  getInitialState() {
    return {
      annotatedList: [],
      open: false
    }
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
              index={index}
              showNumber={showNumber}
              text={text}
              numbering={numbering}
              addAnnotaion = {this.addAnnotaion}
              />;

  },

  scrollParentGetter() {
    return window;
  },

  addAnnotaion(textNodeId, isChecked) {
    let annotatedList = this.state.annotatedList;
    if(isChecked) {
      annotatedList.push(textNodeId);
    }
    else {
      let index = annotatedList.indexOf(textNodeId);
      if(index > -1) {
        annotatedList.splice(index, 1);
      }
    }
    this.setState({
      annotatedList: annotatedList
    });
    console.log(this.state.annotatedList)

  },
  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  },
  handleRequestClose() {
    this.setState({
      open: false,
    });
  },
  render() {
    console.log(this.state.annotatedList)
    const style = {
      fab: {
        position: "fixed",
        bottom: 23,
        right: 23,
      },
      annotaionCard: {
        width: 400,
      },
      annotaionInput: {
        width: 350,
        fontWeight: "normal",
        height: 300,
        overflow: "scroll",
      }

    };
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
          <FloatingActionButton
            title="Add annotaion"
            style={style.fab}
            disabled={this.state.annotatedList.length==0}
            onTouchTap={this.handleTouchTap}>
            <ContentAdd />
          </FloatingActionButton>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}} >
            <Card
              style={style.annotaionCard}>
              <CardText>
                <TextField
                  style={style.annotaionInput}
                  multiLine={true} />
              </CardText>
              <CardActions>
                <FlatButton
                  label="Save"
                  primary={true} />
                <FlatButton
                  label="Cancel"
                  onClick={this.handleRequestClose} />
              </CardActions>
            </Card>
          </Popover>

  				<div className="reading-loading-area">
  					<div className="well-spinner"></div>
  				</div>


        </div>

    );

  }

});
ReadingProse.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};