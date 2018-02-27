import React from 'react';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import _ from 'underscore';
import PaginationButton from '../PaginationButton';

import './Pagination.css';

const Pagination = ({ limit, total, location }) => {
	let numPages = Math.ceil(total / limit);
	let prevDots = false;
	let nextDots = false;
	let pages = [];

	if (numPages <= 1) {
		return null;
	}


	// TODO get active page from ReactRouter
	const activePage = parseInt(location.query.page, 10) || 1;

	// determine dots
	if (numPages >= 9) {
		if (activePage > 5) {
			prevDots = true;
		}
		if (numPages - activePage > 5) {
			nextDots = true;
		}
	}

	// determine page numbers
	if (numPages >= 9) {
		if (activePage < 5) {
			pages = _.range(1, 9);
		} else if (numPages - activePage < 5) {
			pages = _.range(numPages - 9, numPages);
		} else {
			pages = _.range(activePage - 4, activePage + 4);
		}
	} else {
		pages = _.range(1, numPages);
	}

	return (
		<div className="pagination">
			{prevDots ?
				<PaginationButton
					first
					page={1}
				/>
			: ''}
			{activePage > 1 ?
				<PaginationButton
					prev
				/>
			: ''}
			{prevDots ?
				<PaginationButton
					dots
				/>
			: ''}
			{pages.map((page) => {
				let isActive = false;

				if (activePage === page) {
					isActive = true;
				}

				return (
					<PaginationButton
						key={page}
						page={page}
						isActive={isActive}
					/>
				);
			})}
			{nextDots ?
				<PaginationButton
					dots
				/>
			: ''}
			{activePage < numPages - 1 ?
				<PaginationButton
					next
				/>
			: ''}
			{nextDots ?
				<PaginationButton
					last
					page={numPages}
				/>
			: ''}
		</div>
	);
};


export default withRouter(Pagination);
