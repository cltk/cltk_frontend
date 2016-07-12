import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

AnnotationItem = React.createClass({

	propTypes: {
		annotation: React.PropTypes.object.isRequired
	},

	getChildContext() {
    	return { muiTheme: getMuiTheme(baseTheme) };
  	},

	getInitialState() {
		return {
			editing: false,
			annotationText: this.props.annotation.content,
      		annotationPrivate: this.props.annotation.isPrivate,
		}
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
		let annotation = {
			content: this.state.annotationText,
			isPrivate: this.state.annotationPrivate,
		};
		Meteor.call('annotation.update', this.props.annotation._id, annotation);
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

	render() {
		const style = {
			annotationCard: {
		        width: 250,
		    },
			annotationInput: {
				width: 200,
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
		if(this.state.editing) {
			//render annotation edit UI
		return (
			<Card
				style={style.annotationCard}>
				<CardTitle
					style={style.annotationTitle}
					subtitle="Edit note" />
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
						rowsMax={4}
						value={this.state.annotationText}
						onChange={this.handleAnnotationInput} />
				</CardText>
				<CardActions>
					<FlatButton
						label="Save"
						primary={true}
						onClick={this.handleSave} />
					<FlatButton
						label="Cancel"
						onClick={this.handleCancel} />
				</CardActions>
			</Card>
		);

		}
		else {
			//render annotation view UI
			return (
				<Card
					style={style.annotationCard}>
		            <CardText>
		            	{this.props.annotation.content}
		            </CardText>
		            <CardActions>
						<FlatButton 
							label="Edit"
							primary={true}
							onClick={this.handleEdit} />
						<FlatButton
							label="Delete"
							onClick={this.handleDelete} />
		            </CardActions>
          		</Card>
			);
		}
	}
});
AnnotationItem.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};