import TextNodes from '/imports/api/collections/textNodes';

UserBookmarksList = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let bookmarkedText = [];
		const handleBookmark = Meteor.subscribe('bookmark');
		const bookmarkList = Meteor.users.findOne({}, { fields: { bookmarks: 1 } });

		const bookmarks = [];

		if (bookmarkList && bookmarkList.bookmarks && bookmarkList.bookmarks.length) {
			bookmarkList.bookmarks.forEach((bookmark) => {
				bookmarks.push(new Meteor.Collection.ObjectID(bookmark));
			});

			const handleText = Meteor.subscribe('textNodes', { _id: { $in: bookmarks } });

			if (handleText.ready()) {
				bookmarkedText = TextNodes.find({ _id: { $in: bookmarks } }).fetch();
			}
		}

		return {
			bookmarkedText,
		};
	},

	render() {
		styles = {
			listItem: {
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				font: 'normal',
			},
			list: {
				marginTop: 0,
			},
		};

		return (
			<div className="collection with-header" style={styles.list}>
				<div className="collection-header"> <h3>Bookmarks</h3></div>
				{this.data.bookmarkedText.map((text, i) => {
					return (
						<BookmarkedTextNode
							key={i}
							isOdd={i % 2}
							text={text}
						/>
					);
				})}
			</div>
		);
	},

});
