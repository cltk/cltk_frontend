import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

AnnotationItem = React.createClass({

	propTypes: {
		isOwner: React.PropTypes.bool.isRequired,
		annotation: React.PropTypes.object,
	},

	getDefaultProps() {
		return {
			annotation: {
				author: 'Archimedes of Syracuse',
				date: '14 Oct 2016',
				thumbnail: '/images/archimedes.jpg',
				content: 'Quid faciat laetas segetes quo sidere terram vertere Mycenas ' +
				'ulmisque adiungere vites conveniat quae curum boum qui cultus habendo',
			},
		};
	},

	getInitialState() {
		return {
			editing: false,
			annotationText: this.props.annotation.content,
			annotationPrivate: this.props.annotation.isPrivate,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	handleEdit() {
		this.setState({
			editing: true,
		});
	},

	handleDelete() {
		Meteor.call('annotation.remove', this.props.annotation._id);
	},

	handleCancel() {
		this.setState({
			editing: false,
		});
	},

	handleSave() {
		this.setState({
			editing: false,
		});
		const annotationData = {
			content: this.state.annotationText,
			isPrivate: this.state.annotationPrivate,
		};
		Meteor.call('annotation.update', this.props.annotation._id, annotationData);
	},

	handleAnnotationToggle() {
		this.setState({
			annotationPrivate: !this.state.annotationPrivate,
		});
	},

	handleAnnotationInput(event) {
		this.setState({
			annotationText: event.target.value,
		});
	},

	render() {
		const annotation = this.props.annotation;

		const style = {
			annotationCard: {
				width: 250,
			},
			annotationInput: {
				width: 200,
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


		if (this.props.isOwner && this.state.editing) {
			// render annotation edit UI
			return (
				<Card
					style={style.annotationCard}
				>
					<CardTitle
						style={style.annotationTitle}
						subtitle="Edit note"
					/>
					<Toggle
						style={style.annotationToggle}
						label="Private"
						toggled={this.state.annotationPrivate}
						onToggle={this.handleAnnotationToggle}
					/>
					<CardText>
						<TextField
							name="annotationInput"
							style={style.annotationInput}
							multiLine
							rowsMax={4}
							value={this.state.annotationText}
							onChange={this.handleAnnotationInput}
						/>
					</CardText>
					<CardActions>
						<FlatButton
							label="Save"
							primary
							onClick={this.handleSave}
						/>
						<FlatButton
							label="Cancel"
							onClick={this.handleCancel}
						/>
					</CardActions>
				</Card>
			);
		}

		// render annotation view UI
		return (
			<div className="annotation-item">
				<div className="annotation-header">
					<div className="annotation-profile-image">
						<img alt={annotation.author} src={annotation.thumbnail} />
					</div>
					<h4 className="annotation-author">
						{annotation.author}
					</h4>
					<span className="annotation-date">
						{annotation.date}
					</span>
					{this.props.isOwner ?
						<div className="annotation-item-actions">
							<FlatButton
								label="Edit"
								primary
								onClick={this.handleEdit}
							/>
							<FlatButton
								label="Delete"
								onClick={this.handleDelete}
							/>
						</div>
						:
						null
					}
				</div>
				<p>
					{this.props.annotation.content}
				</p>
			</div>
		);
	},
});
AnnotationItem.childContextTypes = {
	muiTheme: React.PropTypes.object.isRequired,
};
