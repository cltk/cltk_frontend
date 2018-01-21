import React from 'react';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';
import ReleaseMessage from '../../components/common/ReleaseMessage';

import './MainLayout.css';

const MainLayout = props => (
	<div>
		<Header />
		{props.children}
		<Footer />
		<ReleaseMessage />
	</div>
);

export default MainLayout;
