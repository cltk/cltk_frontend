import React from 'react';
import { withRouter } from 'react-router';
import autoBind from 'react-autobind';

import Cover from '../../../../../../components/common/cover/Cover';


import './HomeIntro.css';


class HomeIntro extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			textsearch: '',
		};
		autoBind(this);
	}

	onChangeTextSearch(e) {
		this.setState({
			textsearch: e.target.value,
		});
	}

	onSubmit() {
		this.props.router.push({
			pathname: '/browse',
			query: {
				textsearch: this.state.textsearch,
			},
		});
	}

	render (props) {
		return (
			<Cover
				className="homeIntroCover"
				background={
					<div>
						<div
							className="coverBackgroundHomeIntro"
							style={{
								backgroundImage: 'url(/images/column.jpg)',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundRepeat: 'no-repeat',
							}}
						/>
						<div className="backgroundScreenHomeIntro" />
					</div>
				}
				full
			>
				<div className="container header-container">
					<div className="header-center text-center">
						<h1>Explore open classical literature</h1>
						<form
							className="searchInput"
							onSubmit={this.onSubmit}
						>
							<input
								className="searchInputText"
								type="text"
								placeholder="Enter your keywords . . ."
								onChange={this.onChangeTextSearch.bind(this)}
							/>
							<input
								type="submit"
								value="Search"
							/>
						</form>
						<h6 className="uppercase mb16">
							Read and research works in 15 languages, including Arabic, Bengali, Greek, Hebrew, Latin, Sanskrit,
							Telugu, and Tibetan and contribute annotations to the community.
						</h6>
					</div>
				</div>
			</Cover>
		);
	}
}


export default withRouter(HomeIntro);
