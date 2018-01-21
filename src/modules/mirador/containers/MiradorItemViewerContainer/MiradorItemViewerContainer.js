import React from 'react';
import { compose } from 'react-apollo';

import manifestQuery from '../../graphql/queries/manifest';
import MiradorItemViewer from '../../components/MiradorItemViewer';



class MiradorItemContainer extends React.Component {

 	render () {
		let manifest = null;

		if (
			this.props.manifestQuery
		&& this.props.manifestQuery.project
		&& this.props.manifestQuery.project.item
		&& this.props.manifestQuery.project.item.manifest
		) {
			manifest = this.props.manifestQuery.project.item.manifest;
		}

		if (!manifest) {
			return null;
		}

		return (
			<MiradorItemViewer
				manifest={manifest}
			/>
		);
	}
}


export default compose(
	manifestQuery,
)(MiradorItemContainer);
