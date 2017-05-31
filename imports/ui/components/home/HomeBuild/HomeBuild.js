import React from 'react';

export default function HomeBuild(props) {
	return (
		<section id="build" >
			<div className="container text-center">

				<div className="row">

					<h2 className="section-title">Contribute code to the CLTK Core or Archive</h2>

					<hr className="section-header-line" />
				</div>
				<div className="row">


					<div className="col-sm-6 text-center">
						<a
							href="https://github.com/cltk/cltk"
							target="_blank"
							rel="noopener noreferrer"
							className="start-building-item"
						>
							<i className="mdi mdi-github-circle icon-lg mb40 mb-xs-24  " />
							<h5 className="uppercase">Code the CLTK Core NLP package</h5>
							<span className="item-text">
								Help push forward what's possible with study of classicallanguages
								by developing the CLTK core natural language processing library
							</span>
						</a>

					</div>
					<div className="col-sm-6 text-center">

						<a
							href="https://github.com/cltk/cltk_frontend"
							target="_blank"
							rel="noopener noreferrer"
							className="start-building-item"
						>
							<i className="mdi mdi-book-open-page-variant icon-lg mb40 mb-xs-24 " />
							<h5 className="uppercase">Build the CLTK Archive</h5>
							<span className="item-text">
								Contribute code, thoughts, or ideas to the CLTK Archive's
								public reading interface and annotation environment
							</span>

						</a>

					</div>

				</div>
			</div>

		</section>

	);
}
