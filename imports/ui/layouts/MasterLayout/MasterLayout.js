import React from 'react';
import PropTypes from 'prop-types';

import Header from '/imports/ui/components/header/Header';
import Footer from '/imports/ui/components/footer/Footer';
import SearchModal from '/imports/ui/components/search/SearchModal';

export default class MasterLayout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchModalVisible: false,
		};
	}

	componentDidMount() {
		if (typeof location.hash !== 'undefined' && location.hash.length > 0) {
			setTimeout(() => {
				$('html, body').animate({ scrollTop: $(location.hash).offset().top - 100 }, 300);
			}, 1000);
		}
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
					changeSearchParams={() => {}}
					closeSearchModal={this.closeSearchModal}
					visible={this.state.searchModalVisible}
				/>
			</div>
		);
	}

};

MasterLayout.propTypes = {
	content: PropTypes.element,
};
