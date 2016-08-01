import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';

LoginDialog = React.createClass({

	propTypes: {
		initialOpen: React.PropTypes.bool.isRequired,
		handleLoginDialogClose: React.PropTypes.func.isRequired,
	},

	getChildContext() {
    	return { muiTheme: getMuiTheme(baseTheme) };
  	},

	getInitialState() {
		return {
			open: this.props.initialOpen,
		}
	},

	handleClose() {
		this.setState({
			open: false,
		});
      	if (typeof this.props.handleLoginDialogClose === 'function') {
			this.props.handleLoginDialogClose();
		}
	},

	render() {
		const styles = {
			closeButton: {
				width: "auto",
				float: "right",
				top: -10
			},
			dialogTitle: {
				width: "auto",
				float: "left",
			},
		};
		return(

			<Dialog
				modal={true}
				open={this.state.open}
				titleStyle={styles.dialogTitle}
				autoScrollBodyContent={true}
				>
	        	<IconButton
	        		tooltip="Close" style={styles.closeButton}
	        		onClick={this.handleClose}>
			    	<ContentClear />
			    </IconButton>
			    <div className="row">
    				<div className="col s12 m8 push-m2 push-l3 l6 z-depth-1">
	        			<BlazeToReact blazeTemplate="atForm" />
	        		</div>
	        	</div>
	        </Dialog>
	    );
	}
});

LoginDialog.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
