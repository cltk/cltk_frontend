import React from 'react';

import HomeBuild from './sections/HomeBuild';
import HomeFeatures from './sections/HomeFeatures';
import HomeIntro from './sections/HomeIntro';
import SearchModal from './sections/SearchModal';

export default class HomeLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			textsearch: '',
			limit: 21,
			offset: 0,
			searchModalVisible: false,
		};

		this.handleChangeTextsearch = this.handleChangeTextsearch.bind(this);
		this.closeSearchModal = this.closeSearchModal.bind(this);
		this.showSearchModal = this.showSearchModal.bind(this);
		this.loadMore = this.loadMore.bind(this);
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

	handleChangeTextsearch(newValue) {
		this.setState({
			textsearch: newValue.textsearch,
		});
	}

	loadMore() {
		this.setState({
			limit: this.state.limit + 21,
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
					<HomeIntro
						showSearchModal={this.showSearchModal}
					/>
					<HomeFeatures />
					<HomeBuild />
					<Footer />
				</div>
				<SearchModal
					handleChangeTextsearch={this.handleChangeTextsearch}
					closeSearchModal={this.closeSearchModal}
					visible={this.state.searchModalVisible}
					textsearch={this.state.textsearch}
					loadMore={this.loadMore}
					limit={this.state.limit}
					offset={this.state.offset}
				/>
			</div>
		);
	}
}
