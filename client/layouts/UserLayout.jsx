UserLayout = React.createClass({
	render() {
		return (
			<div className="cltk-layout user-layout">
				<Header />
				<div className="container" style={{ paddingTop: 70 }}>
					<div className="row">
						<div className="col-md-8">
							<BlazeToReact blazeTemplate="profile" />
						</div>
						<div className="col-md-4">
							<div>
								<BookmarkList />
							</div>
							<div>
								<NotesList />
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	},

});
