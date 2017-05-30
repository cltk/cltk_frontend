import React from 'react';

import Footer from '/imports/ui/components/footer/Footer/Footer.jsx';
import Header from '/imports/ui/components/header/Header/Header.jsx';
import HomeBuild from '/imports/ui/components/home/HomeBuild/HomeBuild.jsx';
import HomeFeatures from '/imports/ui/components/home/HomeFeatures/HomeFeatures.jsx';
import HomeIntro from '/imports/ui/components/home/HomeIntro/HomeIntro.jsx';
import SearchModal from '/imports/ui/components/search/SearchModal.jsx';

export default class HomeLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchParams: {
				filters: [],
				limit: 15,
				skip: 0,
			},

			searchModalVisible: false,
		};

		this.changeSearchParams = this.changeSearchParams.bind(this);
		this.closeSearchModal = this.closeSearchModal.bind(this);
		this.showSearchModal = this.showSearchModal.bind(this);
	}

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
	}

	changeSearchParams(searchParams) {
		this.setState({
			...this.state.searchParams,
			...searchParams
		});
	}

	showSearchModal() {
		this.setState({
			searchModalVisible: true,
		});
	}

	closeSearchModal() {
		this.setState({
			searchModalVisible: false,
		});
	}

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
					{/* !(this.state.searchModalVisible) ?
						<HomeGetStarted />
						()
					: '' */}
					<HomeFeatures />
					<HomeBuild />
					<Footer />
				</div>
				<SearchModal
					changeSearchParams={this.changeSearchParams}
					closeSearchModal={this.closeSearchModal}
					searchParams={this.state.searchParams}
					visible={this.state.searchModalVisible}
				/>
			</div>
		);
	}

};
