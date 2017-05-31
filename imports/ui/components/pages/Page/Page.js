import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

// lib
import Utils from '/imports/lib/utils';

// api
import Pages from '/imports/api/collections/pages';

// layouts
import NotFound from '/imports/ui/layouts/notFound/NotFound';

// components
import BackgroundImageHolder from '/imports/ui/components/shared/BackgroundImageHolder';
import LoadingPage from '/imports/ui/components/loading/LoadingPage';


const Page = React.createClass({
	propTypes: {
		slug: React.PropTypes.string,
		page: React.PropTypes.object,
		ready: React.PropTypes.bool,
		images: React.PropTypes.array,
		thumbnails: React.PropTypes.array,
		loading: React.PropTypes.bool,
		settings: React.PropTypes.object,
	},

	render() {
		const { page, settings, slug, loading } = this.props;
		const headerImageUrl = '/images/apotheosis_homer.jpg';

		if (loading) {
			return (
				<LoadingPage />
			);
		} else if (!loading && !page) {
			return (
				<NotFound
					isTest={slug === '__test__'}
				/>
			);
		}

		if (page && page.title) {
			Utils.setTitle(`${page.title} | ${settings.title}`);
		}
		if (headerImageUrl) {
			Utils.setMetaImage(headerImageUrl);
		}

		return (
			// todo: return 404 if !page.length
			<div className={`page page-${slug} content primary`}>

				<section className="block header header-page cover parallax">
					<BackgroundImageHolder
						imgSrc="/images/apotheosis_homer.jpg"
					/>

					<div className="container v-align-transform">
						<div className="grid inner">
							<div className="center-content">
								<div className="page-title-wrap">
									<h1 className="page-title">
										{page.title}
									</h1>
									<h2>
										{page.subtitle}
									</h2>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="page-content container">
					{page.byline ?
						<div className="page-byline">
							<h3>
								{page.byline}
							</h3>
						</div>
						: ''}
					<div dangerouslySetInnerHTML={{ __html: page.content }} />
				</section>
			</div>
		);
	},
});

const pageContainer = createContainer(({ slug }) => {
	let page = {};
	let images = [];
	let thumbnails = [];
	const handle = Meteor.subscribe('pages', slug);
	let loading = true;
	const settingsHandle = Meteor.subscribe('settings.tenant', Session.get('tenantId'));

	if (handle.ready()) {
		page = Pages.find({ slug }).fetch()[0];
		const imageSub = Meteor.subscribe('pageImages', slug);
		if (page && imageSub.ready()) {
			if (page.headerImage && Array.isArray(page.headerImage)) {
				images = Images.find({ _id: { $in: page.headerImage } }).fetch();
				thumbnails = Thumbnails.find({ originalId: { $in: page.headerImage } }).fetch();
			}
		}
		loading = false;
	}

	return {
		page,
		ready: handle.ready(),
		images,
		thumbnails,
		loading,
		settings: settingsHandle.ready() ? Settings.findOne() : { title: '' }
	};
}, Page);

export default pageContainer;
