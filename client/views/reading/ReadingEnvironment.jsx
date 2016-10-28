
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';

ReadingEnvironment = React.createClass({

	propTypes: {
		work: React.PropTypes.object.isRequired,
		textNodes: React.PropTypes.array.isRequired,
		loadMore: React.PropTypes.func.isRequired,
		calculateTextNodeDepths: React.PropTypes.func.isRequired,
		highlightId: React.PropTypes.string,
		toggleReadingMeta: React.PropTypes.func,
		isTextRemaining: React.PropTypes.bool,
		isTextBefore: React.PropTypes.bool,
		isLoading: React.PropTypes.bool,
	},

	childContextTypes: {
		muiTheme: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		return {
			isLoading: false,
		};
	},

	getChildContext() {
		return { muiTheme: getMuiTheme(baseTheme) };
	},

	componentDidUpdate(prevProps) {
		if (this.props.textNodes.length !== prevProps.textNodes.length) {
			this.isLoading = false;
		}
	},

	isLoading: false,

	loadMore(direction) {
		if (!this.isLoading) {
			this.isLoading = true;
			this.props.loadMore(direction);
		}
	},

	renderText() {
		const textNodes = this.props.textNodes;

		return textNodes.map((text, index) => {
			let showNumber = false;
			let numbering = '';

			if (text.n_3) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = textNodes[index - 1].n_2 !== text.n_2;
				}
				if (showNumber) {
					numbering = `${text.n_1}.${text.n_2}`;
				}
			} else if (text.n_2) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = textNodes[index - 1].n_1 !== text.n_1;
				}
				if (showNumber) {
					numbering = (text.n_1).toString();
				}
			}

			return (
				<ReadingTextNode
					key={text._id}
					index={index}
					showNumber={showNumber}
					text={text}
					numbering={numbering}
					addAnnotationCheckList={this.addAnnotationCheckList}
					highlight={this.props.highlightId === text._id}
					toggleReadingMeta={this.props.toggleReadingMeta}
				/>
			);
		});
	},

	render() {
		const work = this.props.work;
		const form = work.form || 'prose';

		return (
			<div className={`reading-container reading-container--${form}`}>

				<section className="page-head fullscreen image-bg ">

					<div className="background-image-holder less-blur blur">
						<img className="background-image" alt="background" src="/images/temple.jpg" />
					</div>

					<div className="background-screen reading-page-background-screen" />

					<div className="container v-align-transform">
						<div className="row">
							<div className="col-sm-10 col-sm-offset-1 text-center">
								<div className="work-authors">
									{work.authors.map((author, i) => (
										<a
											key={i}
											href={`/authors/${author.slug}`}
											className="work-author"
										>
											<h4>
												{author.english_name}
												<span className="work-author-original-name">
													({author.original_name})
												</span>
											</h4>
										</a>
									))}
								</div>

								<div className="work-title-outer">
									<h1 className="work-title">
										{work.english_title}
									</h1>
									{work.original_title ?
										<span className="work-original-title">
											{work.original_title}
										</span>
										:
										''
									}
								</div>

							</div>
						</div>

					</div>

				</section>

				{this.props.isTextBefore ?
					<div className="reading-load-more reading-load-more--before">
						<FlatButton
							className="load-more"
							onClick={this.loadMore.bind(null, 'previous')}
							label="Previous"
						/>
					</div>
				: '' }
				<div className="reading-text-outer">
					{this.renderText()}
				</div>
				{this.props.isTextRemaining ?
					<div className="reading-load-more reading-load-more--after">
						<FlatButton
							className={`load-more ${this.isLoading ? 'load-more--loading' : ''}`}
							onClick={this.loadMore.bind(null, 'next')}
							label={this.isLoading ? 'Loading . . .' : 'Next'}
						/>
					</div>
				: '' }


			</div>

		);
	},

});
