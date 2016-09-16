HomeLayout = React.createClass({

	render() {
		return (
			<div className="cltk-layout home-layout">
				<Header />
				<HomeView />
				<Footer />
				<SearchModal />
			</div>
		);
	},

});
