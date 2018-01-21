import React from 'react';
// import PropTypes from 'prop-types';
import _ from 'underscore';
import PaginationButton from '../PaginationButton';

import './Pagination.css';

const Pagination = ({ limit, total }) => {
	const numPages = Math.ceil(total / limit);

	if (numPages <= 1) {
		return null;
	}

	// TODO get active page from ReactRouter
	const activePage = 1;

	return (
		<div className="pagination">
			{activePage > 1 ?
				<PaginationButton
					prev
				/>
			: ''}
			{_.range(1, numPages).map((page) => {
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
			{activePage < numPages - 1 ?
				<PaginationButton
					next
				/>
			: ''}
		</div>
	);
};


export default Pagination;
