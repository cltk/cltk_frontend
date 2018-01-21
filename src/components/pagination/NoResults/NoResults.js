import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


import './NoResults.css';


const NoResults = ({ message }) => (
	<Grid>
		<Row>
			<Col>
				<div className="noResults">
					<p>
						{message}
					</p>
				</div>
			</Col>
		</Row>
	</Grid>
);

export default NoResults;
