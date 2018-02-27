import React from 'react';

import HomeBuild from './sections/HomeBuild';
import HomeFeaturesContainer from '../../containers/HomeFeaturesContainer';
import HomeIntro from './sections/HomeIntro';

import './Home.css';


const Home = () => (
	<div className="cltk-layout home-layout">
		<div className="home-content">
			<HomeIntro />
			<HomeFeaturesContainer />
			<HomeBuild />
		</div>
	</div>
);

export default Home;
