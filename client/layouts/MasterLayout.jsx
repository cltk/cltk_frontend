MasterLayout = React.createClass({
	propTypes: {
		content: React.PropTypes.element,
	},

	render() {
		return (
			<div className="cltk-layout master-layout">
				<Header />
				<main>
					{this.props.content}
				</main>
				<Footer />
			</div>
		);
	},

});
