import React from 'react';
import { Row, Col } from 'react-bootstrap';

import CountSection from '../CountSection';


import './DashboardCounts.css';


const DashboardCounts = ({ collectionsCount, articlesCount, itemsCount, textsCount }) => (
	<div className="dashboardCounts">
		<Row>
			<Col md={3}>
				<CountSection
					label="Collections"
					count={collectionsCount}
					link="/collections"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Items"
					count={itemsCount}
					link="/items"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Articles"
					count={articlesCount}
					link="/articles"
				/>
			</Col>
			<Col md={3}>
				<CountSection
					label="Texts"
					count={textsCount}
					link="/texts"
				/>
			</Col>
		</Row>
	</div>
);

export default DashboardCounts;
