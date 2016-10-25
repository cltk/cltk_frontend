BookmarkList = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() {
		let bookmarkedText = [];
		const handleBookmark = Meteor.subscribe('bookmark');
		if (handleBookmark.ready()) {
			const bookmarkList = Meteor.users.findOne({}, { fields: { bookmarks: 1 } });
			if (bookmarkList && bookmarkList.bookmarks) {
				bookmarkedText = Texts.find({ _id: { $in: bookmarkList.bookmarks } }).fetch();
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
			innerList: {
				maxHeight: 250,
				overflow: 'auto',
			},
			list: {
				marginTop: 0,
			},
		};
		return (
			<ul className="collection with-header" style={styles.list}>
				<li className="collection-header"> <h3>Bookmarks</h3></li>
				<div style={styles.innerList}>
					{this.data.bookmarkedText.map((text, i) => (
						<li key={i} className="collection-item" style={styles.listItem}>
							<a href={`/works/${text.author}/${text.work}?id=${text._id}`}>
								{text.html}
							</a>
						</li>
				))}
				</div>
			</ul>
		);
	},

});
