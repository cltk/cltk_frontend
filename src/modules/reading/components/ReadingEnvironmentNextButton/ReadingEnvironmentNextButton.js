import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const ReadingEnvironmentNextButton = props => {
	let workHasNextText = props.locationNext && props.locationNext.length;

	if (!workHasNextText) {
		return null;
	}

	return (
		<div className="reading-load-more reading-load-more--after">
			<FlatButton
				className={`load-more ${props.isLoading ? 'load-more--loading' : ''}`}
				onClick={props.loadMore}
				label={props.isLoading ? 'Loading . . .' : 'Next'}
			/>
		</div>
	);
}

export default ReadingEnvironmentNextButton;
