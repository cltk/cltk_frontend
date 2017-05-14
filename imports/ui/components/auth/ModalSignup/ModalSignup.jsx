import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

ModalSignup = React.createClass({

	propTypes: {
		lowered: React.PropTypes.bool,
		closeModal: React.PropTypes.func,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	render() {
		const lowered = this.props.lowered;

		return (
			<div
				className={`cltk-modal-signup cltk-modal cltk-login-signup
					${((lowered) ? ' lowered' : '')}`}
			>
				<div
					className="close-modal paper-shadow"
					onClick={this.props.closeModal}
				>
					<i className="mdi mdi-close" />
				</div>
				<div className="modal-inner">
					<BlazeToReact blazeTemplate="atForm" state="signUp" />
				</div>
			</div>
		);
	},
});
