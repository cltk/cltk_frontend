import React from 'react';
import PropTypes from 'prop-types';

function backgroundImages () {
	$('.background-image-holder').each((i, elem) => {
		const imgSrc = $(elem).children('img').attr('src');
		$(elem).css('background', `url("${imgSrc}")`);
		$(elem).children('img').hide();
		$(elem).css('background-position', 'initial');
		$(elem).addClass('fadeIn');
	});

	// Fade in background images
	setTimeout(() => {
		$('.remove-blur').removeClass('blur');
		$('.remove-blur').removeClass('blur-10');
	}, 300);
}

class BackgroundImageHolder extends React.Component {

	componentDidMount() {
		backgroundImages();
		const elem = document.querySelector('header');
		if (elem) {
			const headroom = new Headroom(elem);
			headroom.init();
		}
	}

	render() {
		return (
			<div>
				<div className="background-image-holder blur-2--no-remove blur-10 remove-blur">
					<img
						className="background-image"
						alt="CLTK Archive"
						src={this.props.imgSrc}
					/>
				</div>
			</div>);
	}
}
BackgroundImageHolder.propTypes = {
	imgSrc: PropTypes.string.isRequired,
};

export default BackgroundImageHolder;
