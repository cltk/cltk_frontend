import React from 'react';
import { Link } from 'react-router';


import './ReadingEnvironment.css';


const ReadingEnvironment = ({ _id, collection, handleRemove })=> {

	if (!collection) {
		return null;
	}


	return (
		<div className="readingEnvironment">

			<div className="readingEnvironmentHeader">
				<h1 className="readingEnvironmentTitle">
					<span className="textGroupTitle">{collection.textGroup.title},</span> {collection.textGroup.work.english_title}
				</h1>
			</div>
			<div className="readingEnvironmentText">
				{collection.textGroup.work.textNodes.map(textNode => {
					const number = textNode.location[textNode.location.length - 1] + 1;
					let location = '';
					textNode.location.forEach((n, i) => {
						if (i === 0) {
							location = `${n + 1}`;
						} else {
							location = `${location}.${n + 1}`;
						}
					});

					return (
						<div
							className="readingEnvironmentTextNode"
							key={textNode.urn}
						>
							<span className={`
								readingEnvironmentTextNodeNumber
								${
									(number % 5 === 0) ?
									'readingEnvironmentTextNodeNumberShow'
									:
									''
								}
							`}>
								{location}
							</span>
							<p
								className="readingEnvironmentTextNodeText"
								dangerouslySetInnerHTML={{ __html: textNode.text }}
							/>
						</div>
					);
				})}
			</div>
			<div className="readingEnvironmentPagination">
				<Link
					to={`/texts/${_id}/`}
					className="readingEnvironmentPaginationLink readingEnvironmentPaginationLinkPrevious"
				>
					Previous
				</Link>
				<Link
					to={`/texts/${_id}/`}
					className="readingEnvironmentPaginationLink readingEnvironmentPaginationLinkNext"
				>
					Next
				</Link>
			</div>
		</div>
	);
};

export default ReadingEnvironment;
