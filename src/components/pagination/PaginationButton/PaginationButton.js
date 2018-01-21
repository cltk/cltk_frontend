import React from 'react';
import PaginationPrev from './PaginationPrev';
import PaginationPage from './PaginationPage';
import PaginationNext from './PaginationNext';
import './PaginationButton.css';

class PaginationButton extends React.Component {

	renderButtonContent() {
		const { prev, next, page } = this.props;

		if (prev) {
			return <PaginationPrev />;
		} else if (next) {
			return <PaginationNext />;
		}

		return <PaginationPage page={page} />;
	}


	render() {
		const classes = [];
		const { isActive } = this.props;

		if (isActive) {
			classes.push('isActive');
		}

		return (
			<div
				className={`paginationButton ${classes.join(' ')}`}
			>
				{this.renderButtonContent()}
			</div>
		);
	}
}

export default PaginationButton;
