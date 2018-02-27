import React from 'react';
import { compose } from 'react-apollo';

import homeFeaturesQuery from '../../graphql/queries/homeFeaturesQuery';
import HomeFeatures from '../../components/Home/sections/HomeFeatures';

class HomeFeaturesContainer extends React.Component {
	render() {
		let worksCount = 0;
		let textGroupsCount = 0;
		let collectionsCount = 0;

		if (this.props.homeFeaturesQuery) {
			worksCount = this.props.homeFeaturesQuery.worksCount;
			collectionsCount = this.props.homeFeaturesQuery.collectionsCount;
			textGroupsCount = this.props.homeFeaturesQuery.textGroupsCount;
		}

		return (
			<HomeFeatures
				worksCount={worksCount}
				textGroupsCount={textGroupsCount}
				collectionsCount={collectionsCount}
      />
		);
	}
}

export default compose(
  homeFeaturesQuery
)(HomeFeaturesContainer);
