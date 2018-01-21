import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import ItemListContainer from '../../containers/ItemListContainer';

import './ItemCollection.css';

const ItemCollection = props => (
	<div className="itemCollection">
		<Grid>
			<Row>
				<Col>
					<h4>Related Items</h4>
				</Col>
			</Row>
		</Grid>
		<ItemListContainer
			horizontal
			limit={3}
			random
		/>
	</div>
);

export default ItemCollection;
