import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

AnnotateWidget = React.createClass({

  propTypes: {
    annotationCheckList: React.PropTypes.array.isRequired,
    onActionCallback: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      annotationOpen: false,
      annotationText: "",
      annotationPrivate: true,
    }
  },

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  handleAnnotationToggle() {
    this.setState({
      annotationPrivate: !this.state.annotationPrivate
    });
  },

  handleAnnotationInput(event) {
    this.setState({
      annotationText: event.target.value
    });
  },

  handleAnnotationSubmit() {
    let annotation = {
      user: Meteor.userId(),
      textNodes: this.props.annotationCheckList,
      content: this.state.annotationText,
      isPrivate: this.state.annotationPrivate,
    };
    Meteor.call('annotation.insert', annotation);
    this.setState({
      annotationOpen: false,
    });
    this.props.onActionCallback();
  },

  handleAnnotationCancel() {
    this.setState({
      annotationOpen: false,
    });
    this.props.onActionCallback();
  },

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      annotationOpen: true,
      anchorEl: event.currentTarget
    });
  },

  render() {
     const style = {
      fab: {
        position: "fixed",
        bottom: 23,
        right: 23,
      },
      annotationCard: {
        width: 400,
      },
      annotationInput: {
        width: 350,
        fontSize: "small",
      },
      annotationToggle: {
        width: "auto",
        float: "right",
        padding: 16,
      },
      annotationTitle: {
        width: "auto",
        float: "left",
      }

    };
    return (
      <div>
        <FloatingActionButton
          title="Add annotation"
          style={style.fab}
          disabled={this.props.annotationCheckList.length==0}
          onTouchTap={this.handleTouchTap}>
          <ContentAdd />
        </FloatingActionButton>
        <Popover
          open={this.state.annotationOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}} >
          <Card
            style={style.annotationCard}>
            <CardTitle
              style={style.annotationTitle}
              title="Add a note" />
            <Toggle
              style={style.annotationToggle}
              label="Private"
              toggled={this.state.annotationPrivate}
              onToggle={this.handleAnnotationToggle}/>
            <CardText>
              <TextField
                name="annotationInput"
                style={style.annotationInput}
                multiLine={true}
                rows={4}
                rowsMax={4}
                value={this.state.annotationText}
                onChange={this.handleAnnotationInput} />
            </CardText>
            <CardActions>
              <FlatButton
                label="Save"
                primary={true}
                onClick={this.handleAnnotationSubmit} />
              <FlatButton
                label="Cancel"
                onClick={this.handleAnnotationCancel} />
            </CardActions>
          </Card>
        </Popover>
      </div>

    );
  }
});
AnnotateWidget.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
