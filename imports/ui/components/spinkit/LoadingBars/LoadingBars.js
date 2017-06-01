import React from 'react';

export default class LoadingBars extends React.Component {
	render() {
		return (
			<div className="loading-spinner loading-spinner-bars">
				<div className="rect1"></div>
				<div className="rect2"></div>
				<div className="rect3"></div>
				<div className="rect4"></div>
				<div className="rect5"></div>
			</div>
		);
	}
}
