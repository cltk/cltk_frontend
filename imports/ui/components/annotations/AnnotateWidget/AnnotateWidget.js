import React from 'react';
import autoBind from 'react-autobind';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';

export default class AnnotateWidget extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			annotationOpen: false,
			annotationText: '',
			annotationPrivate: true,
		};

		autoBind(this);
	}

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	}

	handleAnnotationToggle() {
		this.setState({
			annotationPrivate: !this.state.annotationPrivate,
		});
	}

	handleAnnotationInput(event) {
		this.setState({
			annotationText: event.target.value,
		});
	}

	handleAnnotationSubmit() {
		const annotation = {
			user: Meteor.userId(),
			textNodes: this.props.annotationCheckList,
			content: this.state.annotationText,
			isPrivate: this.state.annotationPrivate,
			author: this.props.work.author,
			work: this.props.work.slug,
		};

		Meteor.call('annotation.insert', annotation);
		this.setState({
			annotationOpen: false,
		});

		this.props.annotationSubmit();
	}

	handleAnnotationCancel() {
		this.setState({
			annotationOpen: false,
		});
		this.props.onActionCallback();
	}

	handleTouchTap(event) {
		// This prevents ghost click.
		event.preventDefault();

		this.setState({
			annotationOpen: true,
			anchorEl: event.currentTarget,
		});
	}

	render() {
		const style = {
			annotationCard: {
				width: 400,
			},
			annotationInput: {
				width: 350,
				fontSize: 'small',
			},
			annotationToggle: {
				width: 'auto',
				float: 'right',
				padding: 16,
			},
			annotationTitle: {
				width: 'auto',
				float: 'left',
			},

		};
		return (
			<div>
				<div className="annotations-toggles" >
					<div className="annotations-buttons" >

						<div
							className="annotations-button correction-button"
							onClick={this.toggleBaseannotationDrawer}
						>
							<IconButton
								className="annotations-icon-button"
								iconClassName="mdi mdi-beta"
							/>
							<span className="annotations-button-label">
								Submit Correction
							</span>
						</div>

						<div
							className="annotations-button add-annotation-button"
							onClick={this.toggleBaseannotationDrawer}
						>
							<IconButton
								className="annotations-icon-button"
								iconClassName="mdi mdi-share"
							/>
							<span className="annotations-button-label">
								Share
							</span>
						</div>


						<div
							className="annotations-button media-button"
							onClick={this.toggleBaseannotationDrawer}
						>
							<IconButton
								className="annotations-icon-button"
								iconClassName="mdi mdi-message-image"
							/>
							<span className="annotations-button-label">
								Upload Media
							</span>
						</div>

					</div>


					<FloatingActionButton
						className="annotations-fab"
					>
						<ContentAdd />
					</FloatingActionButton>

				</div>
			</div>
		);
	}
}

AnnotateWidget.propTypes = {
	annotationCheckList: React.PropTypes.array.isRequired,
	work: React.PropTypes.object.isRequired,
	annotationSubmit: React.PropTypes.func,
	onActionCallback: React.PropTypes.func,
};

AnnotateWidget.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
