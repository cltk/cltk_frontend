import React from 'react';
import PaginationPrev from './PaginationPrev';
import PaginationPage from './PaginationPage';
import PaginationNext from './PaginationNext';
import PaginationDots from './PaginationDots';
import PaginationFirst from './PaginationFirst';
import PaginationLast from './PaginationLast';
import './PaginationButton.css';

class PaginationButton extends React.Component {

	renderButtonContent() {
		const { prev, next, dots, page, first, last } = this.props;

		if (prev) {
			return <PaginationPrev page={page} />;
		} else if (next) {
			return <PaginationNext page={page} />;
		} else if (dots) {
			return <PaginationDots dots />;
		} else if (first) {
			return <PaginationFirst page={page} />;
		} else if (last) {
			return <PaginationLast page={page} />;
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
