import React from 'react';
import { compose } from 'react-apollo';

import pageDetailQuery from '../../graphql/queries/detail';
import Page from '../../components/Page';


const PageContainer = props => (
	<Page {...props} />
);

export default compose(
	pageDetailQuery,
)(PageContainer);
