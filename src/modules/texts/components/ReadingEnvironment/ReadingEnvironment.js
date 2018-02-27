import React from 'react';
import { Link } from 'react-router';


import './ReadingEnvironment.css';


const ReadingEnvironment = ({
	textNodes, id, english_title, original_title, slug, textLocationPrev, textLocationNext
})=> {

	if (!id) {
		return null;
	}


	return (
		<div className="readingEnvironment">
			<div
				className="pageReadingHead"
				style={{
					backgroundImage: 'url(/images/chariots_boar.jpg)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>

			<div className="readingEnvironmentText">
				{textNodes.map(textNode => {
					const number = textNode.location[textNode.location.length - 1];
					let location = '';
					textNode.location.forEach((n, i) => {
						if (i === 0) {
							location = `${n}`;
						} else {
							location = `${location}.${n}`;
						}
					});

					return (
						<div
							className="readingEnvironmentTextNode"
							key={textNode.location.join('.')}
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
				{textLocationPrev ?
					<Link
						to={`/texts/${id}/${slug}/${textLocationPrev.join('.')}`}
						className="readingEnvironmentPaginationLink readingEnvironmentPaginationLinkPrevious"
					>
						Previous
					</Link>
				: ''}
				{textLocationNext ?
					<Link
						to={`/texts/${id}/${slug}/${textLocationNext.join('.')}`}
						className="readingEnvironmentPaginationLink readingEnvironmentPaginationLinkNext"
					>
						Next
					</Link>
				: ''}
			</div>
		</div>
	);
};

export default ReadingEnvironment;
