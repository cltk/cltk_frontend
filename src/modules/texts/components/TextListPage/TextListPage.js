import React from 'react';
import _ from 'underscore';

import CollectionCover from '../../../collections/components/CollectionCover';
import TextListContainer from '../../containers/TextListContainer';

import './TextListPage.css';

const TextListPage = props => {
	let files = [];
	let coverImage = null;

	if (props.files && props.files.length) {
		files = props.files;
	}

	if (files.length) {
		coverImage = _.sample(files).name;
	}

	return (
		<div >
			<CollectionCover
				title="Texts"
				coverLink={props.userIsAdmin ? '/texts/create' : null}
				coverLinkText={props.userIsAdmin ? 'Create new' : null}
				coverImage={coverImage}
			/>
			<TextListContainer />
		</div>
	);
}


export default TextListPage;
