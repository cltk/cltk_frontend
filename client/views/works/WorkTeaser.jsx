import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import CommunicationComment from 'material-ui/svg-icons/communication/comment';
import ActionInput from 'material-ui/svg-icons/action/input';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
// Work Teaser
WorkTeaser = React.createClass({

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  },

  propTypes: {
    // This component gets the work to display through a React prop.
    // We can use propTypes to indicate it is required
    work: React.PropTypes.object.isRequired
  },


  render() {
    let work = this.props.work;
    let work_url = "/works/" + work.slug + "/1";

     return (
       <div className="work-teaser">
         <Card>
            <a href={work_url}>
              <CardTitle title={work.title} subtitle={work.author} />
            </a>
            <CardText>
              {work.editor} {work.year}
            </CardText>
            <Divider />
            <CardActions>
              <a href="#">
                <IconButton tooltip="Comment">
                  <CommunicationComment />
                </IconButton>
              </a>
              <a href="#">
                <IconButton tooltip="Favorite">
                  <ActionFavoriteBorder />
                </IconButton>
              </a>
              <a href="#">
                <IconButton tooltip="Other Formats">
                  <ActionInput />
                </IconButton>
              </a>
            </CardActions>
          </Card>
        </div>
      );
    }

});

WorkTeaser.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
