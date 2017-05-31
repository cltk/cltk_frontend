MasterLayout = React.createClass({
	propTypes: {
		content: React.PropTypes.element,
	},

	getInitialState() {
		return {
			searchModalVisible: false,
		};
	},

	componentDidMount() {
		if (typeof location.hash !== 'undefined' && location.hash.length > 0) {
			setTimeout(() => {
				$('html, body').animate({ scrollTop: $(location.hash).offset().top - 100 }, 300);
			}, 1000);
		}
	},

	showSearchModal() {
		this.setState({
			searchModalVisible: true,
		});
	},

	closeSearchModal() {
		this.setState({
			searchModalVisible: false,
		});
	},

	render() {
		return (
			<div className="cltk-layout master-layout">
				<div
					className={`master-content
						${(this.state.searchModalVisible ? 'master-content--scaled' : '')}`}
				>
					<Header
						showSearchModal={this.showSearchModal}
					/>
					<main>
						{this.props.content}
					</main>
					<Footer />
				</div>
				<SearchModal
					visible={this.state.searchModalVisible}
					closeSearchModal={this.closeSearchModal}
				/>
			</div>
		);
	},

});
