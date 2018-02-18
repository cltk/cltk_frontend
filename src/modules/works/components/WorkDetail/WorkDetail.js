import React from 'react';
import PropTypes from 'prop-types';

// Single work detail view
class WorkDetail extends React.Component {

	render() {
		const work = this.props.work;

		return (
			<div>
				<section className="page-head image-bg bg-dark">

					<div className="background-image-holder less-blur blur">
						<img alt="CTLK Archive" src="/images/bronze-characters.jpg" />
					</div>
					<div className="background-screen" />

					<div className="container v-align-transform header-container">
						<div className="row">

							<div className="col-sm-12 left">

								<a href="/">
									<h3 className="work-author">{work.author}</h3>
								</a>

								<a href="/">
									<h2 className="card-title work-title">{work.title}</h2>
								</a>
								<a href="/">
									<p className="work-editor">{work.editor}, {work.year}</p>
								</a>


							</div>
							<div className="col-sm-12 right text-right">

								<a href="#comment" className="comments-action ">
									<i className="mdi mdi-comment-outline" />227
								</a>

								<a href="#favorite" className="favorite-action ">
									<i className="mdi mdi-star-outline" />32
								</a>

								<a href="#export" className="export-action ">
									Export
									<i className="mdi mdi-export" />
								</a>

							</div>

						</div>

					</div>

				</section>

				<section className="work-details">

					<div className="container ">
						<div className="row">
							<p>
								Work description lorem ipsum Sed ut perspiciatis unde omnis iste natus error sit
								voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
								illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
								Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
								consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
								quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
								sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
								quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
								corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
								vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae
								consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
							</p>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

WorkDetail.propTypes = {
	work: PropTypes.object.isRequired,
};

export default WorkDetail;
