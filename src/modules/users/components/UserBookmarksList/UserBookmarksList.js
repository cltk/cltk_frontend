import React from 'react';

import { createContainer } from 'meteor/react-meteor-data';

import BookmarkedTextNode from '/imports/ui/components/user/BookmarkedTextNode/BookmarkedTextNode';
import TextNodes from '/imports/api/collections/textNodes';

const UserBookmarksList = props => {
	const styles = {
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
			{props.bookmarkedText && props.bookmarkedText.map((text, i) => {
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
};

const UserBookmarksListContainer = createContainer(props => {
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
}, UserBookmarksList);

export default UserBookmarksListContainer;
