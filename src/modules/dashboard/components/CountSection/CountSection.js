import React from 'react';
import { Link } from 'react-router';

import './CountSection.css';


const CountSection = ({ label, count, link }) => (
	<Link
		className="countSection"
		to={link}
	>
		<span className="count">
			{count}
		</span>
		<label>
			{label}
		</label>
	</Link>
);


export default CountSection;
