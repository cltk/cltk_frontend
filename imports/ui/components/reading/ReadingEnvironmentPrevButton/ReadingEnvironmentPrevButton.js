import React from 'react';
import FlatButton from 'material-ui/FlatButton';


const ReadingEnvironmentPrevButton = props => {
	let workHasPrevText = false;

	if (!workHasPrevText) {
		return null;
	}

	return (
		<div className="reading-load-more reading-load-more--before">
			<FlatButton
				className={`load-more ${props.isLoading ? 'load-more--loading' : ''}`}
				onClick={props.loadMore.bind(this, 'previous')}
				label={props.isLoading ? 'Loading . . .' : 'Previous'}
			/>
		</div>
	);
}

export default ReadingEnvironmentPrevButton;
