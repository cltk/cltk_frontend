import React from 'react';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';

import './MainLayout.css';

const MainLayout = props => (
	<div>
		<Header />
		{props.children}
		<Footer />
	</div>
);

export default MainLayout;
