import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { debounce } from 'throttle-debounce';

Profile = React.createClass({

	propTypes: {
		user: React.PropTypes.object,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	mixins: [ReactMeteorData],

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	componentWillMount() {
		this.handleChangeTextDebounced = debounce(1000, this.handleChangeTextDebounced);
	},

	getMeteorData() {
		return {
			user: Meteor.user(),
		};
	},

	_openFileDialog() {
		const fileUploadDom = this.refs.fileUpload;
		fileUploadDom.click();
	},

	handleChangeText(field, event) {
		const value = event.target.value;
		this.handleChangeTextDebounced(field, value);
	},

	handleChangeTextDebounced(field, value) {
		console.log(value);
		Meteor.call('account.update', `profile.${field}`, value, (err) => {
			if (err) {
				console.error(err);
			}
		});
	},

	handleChangeDate(event = null, date) {
		Meteor.call('account.update', 'profile.birthday', date, (err) => {
			if (err) {
				console.error(err);
			}
		});
	},

	render() {
		console.log(this.data.user);
		const currentUser = this.data.user;
		if (currentUser && !('profile' in currentUser)) {
			currentUser.profile = {};
		}
		const styles = {
			textFieldStyle: {
				boxShadow: 'none',
			},
			floatingLabelStyle: {
				fontSize: 16,
				fontWeight: 'inherit',
			},
			dateTextFieldStyle: {
				width: '100%',
				marginTop: 20,
			},
		};
		return (
			(currentUser ?
				<section className="page-content">
					<div className="user-profile-textfields">

						<TextField
							fullWidth
							floatingLabelText="First Name"
							defaultValue={currentUser.profile.firstName}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'firstName')}
						/>
						<TextField
							fullWidth
							floatingLabelText="Last Name"
							defaultValue={currentUser.profile.lastName}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'lastName')}
						/>
						<DatePicker
							hintText="Birthday"
							autoOk
							textFieldStyle={styles.dateTextFieldStyle}
							defaultDate={currentUser.profile.birthday}
							onChange={this.handleChangeDate}
						/>
						<TextField
							multiLine
							rows={2}
							rowsMax={10}
							fullWidth
							floatingLabelText="Biography"
							defaultValue={currentUser.profile.bio}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'bio')}
						/>
						<TextField
							fullWidth
							floatingLabelText="Country"
							defaultValue={currentUser.profile.country}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'country')}
						/>
						<TextField
							fullWidth
							hintText="https://twitter.com/@your_name"
							floatingLabelText="Twitter"
							defaultValue={currentUser.profile.twitter}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'twitter')}
						/>
						<TextField
							fullWidth
							hintText="https://facebook.com/your.name"
							floatingLabelText="Facebook"
							defaultValue={currentUser.profile.facebook}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'facebook')}
						/>
						<TextField
							fullWidth
							hintText="https://plus.google.com/+YourName"
							floatingLabelText="Google Plus"
							defaultValue={currentUser.profile.google}
							inputStyle={styles.textFieldStyle}
							floatingLabelStyle={styles.floatingLabelStyle}
							onChange={this.handleChangeText.bind(null, 'google')}
						/>
						<span className="form-save-help">
							(These values are saved automatically.)
						</span>

					</div>
				</section>
			:
				<div />
			)

		);
	},

});
