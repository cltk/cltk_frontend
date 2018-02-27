import React from 'react';
import PropTypes from 'prop-types';
import Cover from '../../../../../../components/common/cover/Cover';

import './HomeIntro.css';


export default function HomeIntro(props) {
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
					>
						<input
							className="searchInputText"
							type="text"
							placeholder="Enter your keywords . . ."
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

HomeIntro.propTypes = {
	showSearchModal: PropTypes.func,
};
