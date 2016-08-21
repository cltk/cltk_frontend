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
    work: React.PropTypes.object.isRequired
  },


  render() {
    let work = this.props.work;
    let work_url = "/works/" + work.slug ;

     return (
         <Card
					 className="work-teaser"
					 >

					 	<div className="card-meta-left">
							<IconButton
								tooltip="Add to Your Library"
					      tooltipPosition="top-center"
								className="icon-favorite-button"
								iconClassName="mdi mdi-book-open-variant"
								/>

							<div className="card-meta-items">
								<span className="card-meta card-meta-left-language">
										{Utils.capitalize(work.language)}
								</span>
								<span className="card-meta card-meta-left-date">
										{work.date}
								</span>
							</div>
					 	</div>

						<div className="work-teaser-authors">
							{work.authors.map((author, i) => {
								return <a
									key={i}
									href={"/authors/" + author.slug}
									className="work-teaser-author">
									<h4>
											{author.english_name}
											{author.original_name ?
												<span className="work-teaser-author-original-name">
													({author.original_name})
												</span>
											: ""}
									</h4>
								</a>
							})}
						</div>

            <a
							href={work_url}
							className="work-teaser-title"
							>
              <h3 >
								{work.english_title}
								{work.original_title ?
									<span className="work-teaser-original-title">
										{work.original_title}
									</span>
								: ""}
              </h3>
            </a>

						<div className="card-meta-bottom">
							<span className="card-meta meta-count-commentary">
								{work.countComments} Comments
							</span>
							<span className="card-meta meta-count-translations">
								{work.countTranslations} Translations
							</span>
							<span className="card-meta meta-count-entities">
								{work.countEntities} Entities
							</span>
							<span className="card-meta meta-count-annotations">
								{work.countAnnotations} Annotations
							</span>

						</div>



            {/*<Divider />
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
            </CardActions>*/}
          </Card>
      );
    }

});

WorkTeaser.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
