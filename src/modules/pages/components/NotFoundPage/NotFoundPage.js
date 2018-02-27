import React from 'react';

import PageCover from '../PageCover';
import BackgroundImage from '../../../../components/common/cover/BackgroundImage';


import './NotFoundPage.css';


const NotFoundPage = props => {

	return (
		<div >
			<PageCover
				title="Page Not Found"
				backgroundImage={
					<BackgroundImage
						src={'/images/colosseum.jpg'}
					/>
				}
			/>
			<section className="pageContent">
				<p>
					Sorry this page was not found (404).
				</p>
			</section>
		</div>
	);
}

export default NotFoundPage;
