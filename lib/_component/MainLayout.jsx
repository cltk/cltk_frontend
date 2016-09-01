MainLayout = React.createClass({
	propTypes: {
		content: React.PropTypes.element,
	},

	render() {
		return (
			<main>
				{this.props.content}
			</main>
		);
	},

});
