import React from 'react';
import { Link } from 'react-router';
import { Field } from 'redux-form';
import { Row, Col } from 'react-bootstrap';

import ItemSelectorItemList from '../ItemSelectorItemList';
import ItemSelectorItemListContainer from '../../containers/ItemSelectorItemListContainer';
import { maxLength } from '../../../../lib/formHelpers';

import './ItemSelectorField.css';


const maxLength2100 = maxLength(2100);


const ItemSelectorField = ({ selectedItems, toggleSelectedItem }) => (
	<div className="itemSelector">
		<Row>
			<Col md={6}>
				<div className="itemSelectorItems">
					<label>
						Project Items <Link to="/items/create">Create a new item</Link>
					</label>
					<div className="itemSelectorTextsearch">
						<Field
							name="itemSelectorTextsearch"
							type="text"
							component="input"
							placeholder="Search..."
							validate={[maxLength2100]}
						/>
					</div>
					<ItemSelectorItemListContainer
						selectedItems={selectedItems}
						toggleSelectedItem={toggleSelectedItem}
					/>
				</div>
			</Col>
			<Col md={6}>
				<div className="itemSelectorItems">
					<label>
						Selected
					</label>
					<ItemSelectorItemList
						items={selectedItems}
						toggleSelectedItem={toggleSelectedItem}
						showUnselect
					/>
				</div>
			</Col>
		</Row>
	</div>
);

export default ItemSelectorField;
