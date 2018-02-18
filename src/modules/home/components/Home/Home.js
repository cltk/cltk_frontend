import React from 'react';

import HomeBuild from './sections/HomeBuild';
import HomeFeatures from './sections/HomeFeatures';
import HomeIntro from './sections/HomeIntro';
import SearchModal from '../../../search/components/SearchModal';

const Home = () => (
	<div className="cltk-layout home-layout">
		<div className="home-content">
			<HomeIntro />
			<HomeFeatures />
			<HomeBuild />
		</div>

		<SearchModal />
	</div>
);

export default Home;
