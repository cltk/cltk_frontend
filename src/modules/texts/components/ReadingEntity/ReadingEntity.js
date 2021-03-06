import React from 'react';
import PropTypes from 'prop-types';

import './ReadingEntity.css';

class ReadingEntity extends React.Component {

	getDefaultProps() {
		return {
			entity: {
				slug: 'demo-entity',
			},
		};
	}

	render() {
		const entity = this.props.entity;
		return (
			<div className="entity-teaser">
				<a
					href={`/entities/${entity.slug}`}
					className="entity-thumbnail-image image-wrap paper-shadow"
				>
					<img
						alt="thumbnail"
						src="/images/entities/herodotus_thumbnail.jpg"
					/>
				</a>
				<div className="entity-description">
					<a
						href={`/entities/${entity.slug}`}
						className="entity-name"
					>
						<h4 >Herodotus</h4>
					</a>
					<span className="entity-bio">
						Herodotus was a Greek historian who was born in Halicarnassus
						Caria and lived in the 5th century BC, a contemporary of Socrates ...
					</span>

					<div className="entity-meta">
						<a
							href={`/entities/${entity.slug}#references`}
							className="entity-meta-link entity-additional-refernces entity-action "
						>
							<span>76 other references</span>
						</a>
						<a
							href={`/entities/${entity.slug}#associated-media`}
							className="entity-meta-link entity-media entity-action"
						>
							<span>8 associated media</span>
						</a>

					</div>
				</div>

			</div>
		);
	}
}


ReadingEntity.propTypes = {
	entity: PropTypes.object,
};

export default ReadingEntity;
