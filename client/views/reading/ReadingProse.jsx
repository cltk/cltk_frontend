import { debounce } from 'throttle-debounce';
import InfiniteScroll from '../../../imports/InfiniteScroll.jsx';

ReadingProse = React.createClass({

	propTypes: {
		work: React.PropTypes.object.isRequired,
		textNodes: React.PropTypes.array.isRequired,
		loadMore: React.PropTypes.func.isRequired,
		highlightId: React.PropTypes.string,
	},

	getInitialState() {
		return {
			annotationCheckList: [],
		};
	},

	textNodes: [],

	addAnnotationCheckList(textNodeId, isChecked) {
		const annotationCheckList = this.state.annotationCheckList;
		if (isChecked) {
			annotationCheckList.push(textNodeId);
		} else {
			const index = annotationCheckList.indexOf(textNodeId);
			if (index > -1) {
				annotationCheckList.splice(index, 1);
			}
		}
		this.setState({
			annotationCheckList,
		});
	},

	resetAnnotationCheckList() {
		this.setState({
			annotationCheckList: [],
		});
	},

	renderText() {
		const self = this;

		if (this.props.textNodes.length) {
			this.props.textNodes.forEach(textNode => {
				if (!self.textNodes.some(existingTextNode => existingTextNode._id === textNode._id)) {
					self.textNodes.push(textNode);
				}
			});
		}

		return this.textNodes.map((text, index) => {
			let showNumber = false;
			let numbering = '';

			if (text.n_3) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = this.textNodes[index - 1].n_2 !== text.n_2;
				}
				if (showNumber) {
					numbering = `${text.n_1}.${text.n_2}`;
				}
			} else if (text.n_2) {
				if (index === 0) {
					showNumber = true;
				} else {
					showNumber = this.textNodes[index - 1].n_1 !== text.n_1;
				}
				if (showNumber) {
					numbering = (text.n_1).toString();
				}
			}

			return (
				<ReadingText
					key={text._id}
					index={index}
					showNumber={showNumber}
					text={text}
					numbering={numbering}
					annotationCheckList={this.state.annotationCheckList}
					addAnnotationCheckList={this.addAnnotationCheckList}
					highlight={this.props.highlightId === text._id}
				/>
			);
		});
	},

	render() {
		const work = this.props.work;

		return (
			<div className="reading-container">

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
					loadMore={debounce(2000, this.props.loadMore)}
				>

					<div className="reading-text-outer">
						{this.renderText()}
					</div>

				</InfiniteScroll>

				<div className="reading-loading-area">
					<LoadingWell />
				</div>

				{Meteor.userId() ?
					<AnnotateWidget
						annotationCheckList={this.state.annotationCheckList}
						work={work}
						onActionCallback={this.resetAnnotationCheckList}
					/>
					:
					null
				}

			</div>

		);
	},

});
