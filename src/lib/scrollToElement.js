import scrollToElement from 'scroll-to-element';

export default (event) => {
	event.preventDefault();
	scrollToElement(event.target.hash, {offset: -130});
};
