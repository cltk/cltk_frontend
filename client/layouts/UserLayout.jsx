import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'; import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Tabs, Tab } from 'material-ui/Tabs';
import AvatarEditor from '/imports/avatar/client/ui/AvatarEditor.jsx';


UserLayout = React.createClass({

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	render() {
		return (
			<div className="cltk-layout user-layout">
				<div className="master-content">
					<Header />
					<main>
						<div className="page page-user-profile">

							<section className="page-head fullscreen image-bg bg-dark">

								<div className="background-image-holder more-blur blur">
									<img className="background-image" alt="background" src="/images/books4.jpg" />
								</div>

								<div className="background-screen light" />

								<div className="container v-align-transform">
									<div className="row">
										<div className="col-sm-10 col-sm-offset-1 text-center">
											<div className="user-profile-section">
												<AvatarEditor
													defaultAvatarUrl="/images/default_user.jpg"
												/>
											</div>
										</div>
									</div>

								</div>

							</section>
							<div className="content primary ">
								<div className="user-profile-tabs-wrap">
									<Tabs
										className="user-profile-tabs"
									>
										<Tab
											label="Your Shelf"
											className="user-profile-tab"
										>
											<BookshelfList />
										</Tab>
										<Tab
											label="Bookmarks and Annotations"
											className="user-profile-tab"
										>
											<div
												className="tab-content annotations-tab-content"
											>
												<BookmarkList />
												<NotesList />
											</div>
										</Tab>
										<Tab
											label="Profile"
											className="user-profile-tab"
										>
											<Profile />
										</Tab>
									</Tabs>
								</div>
							</div>
						</div>
					</main>
					<Footer />
				</div>
			</div>
		);
	},

});
