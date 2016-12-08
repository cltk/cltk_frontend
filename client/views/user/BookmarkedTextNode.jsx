import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

BookmarkedTextNode = React.createClass({

	propTypes: {
		text: React.PropTypes.object.isRequired,
		isOdd: React.PropTypes.bool,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		let work = null;
		const query = { _id: this.props.text.work };
		const handleWorks = Meteor.subscribe('works', query);
		work = Works.findOne(query);

		return {
			work,
		};
	},

	getTextLocation() {
		const text = this.props.text;
		let location = '';
		let textN = '';

		if ('n_1' in text) {
			location += text.n_1;
			textN = text.n_1;
		}
		if ('n_2' in text) {
			location += `.${text.n_2}`;
			textN = text.n_2;
		}
		if ('n_3' in text) {
			location += `.${text.n_3}`;
			textN = text.n_3;
		}
		if ('n_4' in text) {
			location += `.${text.n_4}`;
			textN = text.n_4;
		}
		if ('n_5' in text) {
			location += `.${text.n_5}`;
			textN = text.n_5;
		}

		return {
			location,
			textN,
		};
	},

	handleClick() {
		debugger;

	},


	render() {
		const text = this.props.text;
		let textClasses = 'text-node bookmark-text-node clearfix';
		const textLocation = this.getTextLocation();
		let workTitle = '';
		let link = '';

		if (this.data.work) {
			workTitle = this.data.work.english_title;
			link = `/works/${this.data.work._id}/${this.data.work.slug}?location=${textLocation.location}`;
		}

		if (this.props.isOdd) {
			textClasses = `${textClasses} bookmark-text-node--odd`;
		}

		if ((parseInt(textLocation.textN, 10) % 5) === 0) {
			textClasses = `${textClasses} show-number`;
		}

		return (
			<a
				className={textClasses}
				data-id={text._id}
				data-loc={textLocation.location}
				href={link}
			>
				<div className="text-left-header">
					<h2 className="section-numbering">{Utils.trunc(workTitle, 40)} {textLocation.location}</h2>
				</div>

				<p
					className="text-html"
					ref={(ref) => {
						this.anchorEl = ref;
						return ref;
					}}
				>
					{text.text && text.text .length ?
						<span>{Utils.trunc(text.text, 120)}</span>
					:
						<span>[ . . . ]</span>
					}
				</p>

			</a>
		);
	},
});
