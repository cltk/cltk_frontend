import React from 'react';

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
		$('.remove-blur').removeClass('blur-10').addClass('blur');
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
						alt="A Homer Commentary in Progress - Commentator"
						src={this.props.imgSrc}
					/>
				</div>
				<div className="block-screen brown" />
			</div>);
	}
}
BackgroundImageHolder.propTypes = {
	imgSrc: React.PropTypes.string.isRequired,
};

export default BackgroundImageHolder;
