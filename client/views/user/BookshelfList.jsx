BookshelfList = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		const query = {};
		let works = [];

		const user = Meteor.user();

		if (user && 'bookshelf' in user) {
			query._id = {
				$in: user.bookshelf,
			};

			const handle = Meteor.subscribe('works', query, 0, 100);
			if (handle.ready()) {
				works = Works.find(query,
					{
						sort: {
							english_tile: 1,
						},
					}
				).fetch();

				works.forEach((work, i) => {
					works[i].authors = Authors.find({
						_id: {
							$in: work.authors,
						},
					}).fetch();
				});
			}
		}

		works.sort((a, b) => {
			if (a.authors[0].english_name > b.authors[0].english_name) {
				return 1;
			} else if (b.authors[0].english_name > a.authors[0].english_name) {
				return -1;
			}
			return 0;
		});

		return {
			works,
		};
	},

	render() {
		return (
			<div className="container container-bookshelf">
				<div className="works-list works-list--bookshelf">
					{this.data.works.length ?
						<div>
							{this.data.works.map((work, i) => (
								<WorkTeaser
									key={i}
									work={work}
								/>
							))}
						</div>
					:
						<div>
							<p className="no-results no-results--bookshelf">
								You do have have any works saved on your bookshelf yet. <a href="/browse">Add one by browsing the corpora.</a>
							</p>
						</div>
					}
				</div>
			</div>
		);
	},

});
