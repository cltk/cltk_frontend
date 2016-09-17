HomeLayout = React.createClass({

	getInitialState() {
		return {
			searchModalVisible: true,
		}
	},

	componentDidMount() {
		/*
		* Init wow animations on homepage
		*/
		new WOW().init();
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
			<div className="cltk-layout home-layout">
				<Header />
				<HomeIntro
					showSearchModal={this.showSearchModal}
					 />
				<HomeGetStarted />
				<HomeFeatures />
				<HomeBuild />
				<Footer />
				<SearchModal
					visible={this.state.searchModalVisible}
					closeSearchModal={this.closeSearchModal}
					/>
			</div>
		);
	},

});
