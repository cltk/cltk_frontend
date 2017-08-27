import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const ReadingEnvironmentNextButton = props => {
	let workHasNextText = false;

	if (!workHasNextText) {
		return null;
	}

	return (
		<div className="reading-load-more reading-load-more--after">
			<FlatButton
				className={`load-more ${props.isLoading ? 'load-more--loading' : ''}`}
				onClick={props.loadMore.bind(this, 'next')}
				label={props.isLoading ? 'Loading . . .' : 'Next'}
			/>
		</div>
	);
}

export default ReadingEnvironmentNextButton;
