import React from 'react';

import BookmarkedTextNode from '../BookmarkedTextNode';


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

export default UserBookmarksList;
