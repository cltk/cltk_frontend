import React from 'react';
import { Link } from 'react-router';
import './Tag.css';

const Tags = props => (
	<Link to={`/search/?tag=${props.tag}`}>
		<span className="tag">
			{props.tag}
		</span>
	</Link>
);


export default Tags;
