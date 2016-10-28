
ReadingRelatedPassage = React.createClass({

	propTypes: {
		relatedPassage: React.PropTypes.object,
	},

	getDefaultProps() {
		return {
			relatedPassage: {
				workId: 'foobar',
				authorName: 'Theocritus',
				englishTitle: 'Idylls',
				edition: '1920, A. S. F. Gow',
				location: '17.2',
				textNodes: [
					{
						text: 'ἄλλοκα δ’ αὖ ποτὶ τὸν ῥιπτεῖ νόον· οἳ δ’ ὑπ’ ἔρωτος',
						n: 2,
					},
				],
			},
		};
	},

	render() {
		const relatedPassage = this.props.relatedPassage;

		return (
			<div className="related-passage">
				<span className="related-passage-edition">{relatedPassage.edition}</span>
				<a href="#passage" className="related-passage-ref paper-link">
					<h4>
					{relatedPassage.authorName},&nbsp;
					{relatedPassage.englishTitle}&nbsp;
					{relatedPassage.location}
					</h4>
				</a>
				<div className="related-passage-lemma">
					{relatedPassage.textNodes.map((textNode, i) =>
						<p
							key={i}
							className="text-html"
							data-n={textNode.n}
						>
							<span dangerouslySetInnerHTML={{ __html: textNode.html }} />
						</p>
					)}
				</div>
			</div>
		);
	},
});
