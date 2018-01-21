import React from 'react';
import PropTypes from 'prop-types';

import DashboardCounts from '../DashboardCounts';
import DashboardNav from '../DashboardNav';
import DashboardRecentActivity from '../DashboardRecentActivity';


import './Dashboard.css';



const Dashboard = ({ collectionsCount, articlesCount, itemsCount, textsCount }) => (
	<div className="dashboard">
		<DashboardNav />
		<DashboardCounts
			collectionsCount={collectionsCount}
			articlesCount={articlesCount}
			itemsCount={itemsCount}
			textsCount={textsCount}
		/>
		<DashboardRecentActivity />
	</div>
	);

Dashboard.propTypes = {
	collectionsCount: PropTypes.number,
	articlesCount: PropTypes.number,
	itemsCount: PropTypes.number,
	textsCount: PropTypes.number,
};

Dashboard.defaultProps = {
	collectionsCount: 0,
	articlesCount: 0,
	itemsCount: 0,
	textsCount: 0,
};

export default Dashboard;
