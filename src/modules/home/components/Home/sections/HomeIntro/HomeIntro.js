import React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from '../../../../../../components/common/cover/BackgroundImage';

export default function HomeIntro(props) {
	return (
		<section id="intro" className="cover fullscreen image-bg bg-dark ">

			<BackgroundImage
				imgSrc="/images/column.jpg"
			/>
			<div className="background-screen cyan" />

			<div className="container v-align-transform header-container">
				<div className="row">

					<div className="header-center text-center">

						<h1>Explore open classical literature</h1>
						<input
							className="header-search"
							type="text"
							placeholder="Search . . ."
							readOnly
							onClick={props.showSearchModal}
							onTouchTap={props.showSearchModal}
						/>
						<h6 className="uppercase mb16">
							Read and research works in Chinese, Coptic,
							Greek, Hebrew, Latin, Pali, Punjabi, Sanskrit,
							<br />
							Telugu, and Tibetan and contribute annotations to the community.
						</h6>
					</div>
				</div>
			</div>
		</section>

	);
}

HomeIntro.propTypes = {
	showSearchModal: PropTypes.func.isRequired,
};
