import React from 'react';

import PageCover from '../PageCover';
import BackgroundImage from '../../../../components/common/cover/BackgroundImage';


import './AboutPage.css';


const AboutPage = props => {

	return (
		<div >
			<PageCover
				title="About the CLTK Archive"
				backgroundImage={
					<BackgroundImage
						src={'/images/colosseum.jpg'}
					/>
				}
			/>
			<section className="pageContent">
				<p>
					The CLTK Archive is intended to be simple and extendable reading environment in progress that enables users to easily browse and discover classical texts maintained by multiple open source communities.
				</p>
				<p>
					Its goal is to provide a flexible interface for potential growth from multiple contributors in the future that may be able to continue to add texts or layer annotations onto the reading environment.
				</p>
				<p>
					Throughout the process of building and mainting this website, we create and extend many tools that are useful in other projects in the community of digital humanities and digital classics. For instance, the CLTK texts are loosely based on the <a href="http://cite-architecture.github.io/cts/" target="_blank" rel="noopener noreferrer">Canonical Text Services</a> standards created by Neel Smith (Holy Cross) and Christopher Blackwell (Furman) in association with the <a href="http://www.homermultitext.org/" target="_blank" rel="noopener noreferrer">Homer Multitext</a> project.
				</p>
				<p>
					Please read more about the current and past contributors so far here: <a href="https://github.com/cltk/cltk_frontend/graphs/contributors" target="_blank" rel="noreferrer noopener">Contributors</a>.
				</p>
			</section>
		</div>
	);
}

export default AboutPage;
