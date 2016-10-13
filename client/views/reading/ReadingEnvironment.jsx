import debounce from 'throttle-debounce/debounce';
import InfiniteScroll from '../../../imports/InfiniteScroll.jsx';

ReadingEnvironment = React.createClass({

	propTypes: {
		work: React.PropTypes.object.isRequired,
		textNodes: React.PropTypes.array.isRequired,
		loadMore: React.PropTypes.func.isRequired,
		calculateTextNodeDepths: React.PropTypes.func.isRequired,
		highlightId: React.PropTypes.string,
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
				/>
			);
		});
	},

	render() {
		const work = this.props.work;
		const genre = work.genre || 'prose';

		return (
			<div className={`reading-container reading-container--${genre}`}>

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
						{work.original_title ?
							<span className="work-original-title">
								{work.original_title}
							</span>
							:
							''
						}
					</h1>
				</div>

				<InfiniteScroll
					endPadding={120}
					loadMore={debounce(100, this.props.loadMore)}
				>

					<div className="reading-text-outer">
						{this.renderText()}
					</div>

				</InfiniteScroll>

				<div className="reading-loading-area">
					<LoadingWell />
				</div>

			</div>

		);
	},

});
