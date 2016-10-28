HomeLayout = React.createClass({

	getInitialState() {
		return {
			searchModalVisible: false,
		};
	},

	componentDidMount() {
		/*
		* Init wow animations on homepage
		*/
		new WOW().init();

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
			<div className="cltk-layout home-layout">
				<div
					className={`home-content ${this.state.searchModalVisible ?
						'home-content--scaled' : ''}`}
				>
					<Header
						showSearchModal={this.showSearchModal}
					/>
					<HomeIntro
						showSearchModal={this.showSearchModal}
					/>
					<HomeGetStarted />
					<HomeFeatures />
					<HomeBuild />
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
