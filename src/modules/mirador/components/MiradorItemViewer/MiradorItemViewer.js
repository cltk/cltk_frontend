import React from 'react';
import PropTypes from 'prop-types';


import './MiradorItemViewer.css';


class MiradorItemViewer extends React.Component {

	render() {
		const { manifest } = this.props;

		return (
			<iframe
				title="mirador"
				className="miradorItemViewer"
				src={`//s3.amazonaws.com/mirador-cltk001/index.html?manifestUri=${manifest.remoteUri}`}
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					zIndex: '1000',
					border: 'none',
					outline: 'none',
				}}
			/>
		);
	}
}


MiradorItemViewer.propTypes = {
	manifest: PropTypes.object,
};


export default MiradorItemViewer;
