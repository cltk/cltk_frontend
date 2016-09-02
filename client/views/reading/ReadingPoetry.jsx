ReadingProse = React.createClass({

	propTypes: {
		work: React.PropTypes.object.isRequired,
	},

	getInitialState() {
		/* eslint max-len: "off" */
		return {
			text: {
				title: 'Aeneid',
				slug: 'aeneid',
				author: {
					english_full: 'Vergil',
					original_full: 'Publius Vergilius Maximus',
				},
				edition: {
					editor: 'R. A. B. Mynors',
					year: 1922,
				},
				meta: 'book-line',
				books: [
					{
						type: 'book',
						book_n: 'I',
						lines: [
							{
								n: '1',
								html: "<p><span class='scansion-syllable syllable-long'>Ar</span><span class='scansion-syllable syllable-short'>ma</span> <span class='scansion-syllable syllable-short'>vi</span><span class='scansion-syllable syllable-long'>rum</span><span class='scansion-syllable syllable-short'>que</span> <span class='scansion-syllable syllable-short'>ca</span><span class='scansion-syllable syllable-long'>no</span>, <span class='scansion-syllable syllable-long'>Tro</span><span class='scansion-syllable syllable-long'>iae</span> <span class='scansion-syllable syllable-long'>qui</span> <span class='scansion-syllable syllable-long'>pri</span><span class='scansion-syllable syllable-short'>mus</span> <span class='scansion-syllable syllable-short'>ab</span> <span class='scansion-syllable syllable-long'>o</span><span class='scansion-syllable syllable-long'>ris</span></p>",
							}, {
								n: '2',
								html: "<p><span class='scansion-syllable syllable-long'>I</span><span class='scansion-syllable syllable-short'>ta</span><span class='scansion-syllable syllable-short'>li</span><span class='scansion-syllable syllable-long'>am</span>, <span class='scansion-syllable syllable-long'>fa</span><span class='scansion-syllable syllable-long'>to</span> <span class='scansion-syllable syllable-short'>pro</span><span class='scansion-syllable syllable-short'>fu</span><span class='scansion-syllable syllable-long'>gus</span>, <span class='scansion-syllable syllable-long'>La</span><span class='scansion-syllable syllable-long'>vi</span><span class='scansion-syllable syllable-short'>nia</span><span class='scansion-syllable syllable-short'>que</span> <span class='scansion-syllable syllable-long'>ve</span><span class='scansion-syllable syllable-long'>nit</span></p>",
							}, {
								n: '3',
								html: "<p><span class='scansion-syllable syllable-long'>li</span><span class='scansion-syllable syllable-short'>to</span><span class='scansion-syllable syllable-short'>ra</span>, <span class='scansion-syllable syllable-long'>mul</span>tum <span class='scansion-syllable syllable-long'>il</span>le <span class='scansion-syllable syllable-long'>et</span> <span class='scansion-syllable syllable-long'>ter</span><span class='scansion-syllable syllable-long'>ris</span> <span class='scansion-syllable syllable-long'>iac</span><span class='scansion-syllable syllable-long'>ta</span><span class='scansion-syllable syllable-short'>tus</span> <span class='scansion-syllable syllable-short'>et</span> <span class='scansion-syllable syllable-long'>al</span><span class='scansion-syllable syllable-long'>to</span></p>",
							}, {
								n: '4',
								html: "<p><span class='scansion-syllable syllable-long'>vi</span> <span class='scansion-syllable syllable-short'>su</span><span class='scansion-syllable syllable-short'>pe</span><span class='scansion-syllable syllable-long'>rum</span> <span class='scansion-syllable syllable-long'>sae</span><span class='scansion-syllable syllable-long'>vae</span> <span class='scansion-syllable syllable-short'>me</span><span class='scansion-syllable syllable-short'>mo</span><span class='scansion-syllable syllable-long'>rem</span> <span class='scansion-syllable syllable-long'>Iu</span><span class='scansion-syllable syllable-long'>no</span><span class='scansion-syllable syllable-short'>nis</span> <span class='scansion-syllable syllable-short'>ob</span> <span class='scansion-syllable syllable-long'>i</span><span class='scansion-syllable syllable-long'>ram</span>;</p>",
							}, {
								n: '5',
								html: "<p><span class='scansion-syllable syllable-long'>mul</span><span class='scansion-syllable syllable-short'>ta</span> <span class='scansion-syllable syllable-short'>quo</span>que <span class='scansion-syllable syllable-long'>et</span> <span class='scansion-syllable syllable-long'>bel</span><span class='scansion-syllable syllable-long'>lo</span> <span class='scansion-syllable syllable-long'>pas</span><span class='scansion-syllable syllable-long'>sus</span>, <span class='scansion-syllable syllable-long'>dum</span> <span class='scansion-syllable syllable-long'>con</span><span class='scansion-syllable syllable-short'>de</span><span class='scansion-syllable syllable-short'>ret</span> <span class='scansion-syllable syllable-long'>ur</span><span class='scansion-syllable syllable-long'>bem</span>,</p>",
							}, {
								n: '6',
								html: "<p><span class='scansion-syllable syllable-long'>in</span><span class='scansion-syllable syllable-long'>fer</span><span class='scansion-syllable syllable-long'>ret</span><span class='scansion-syllable syllable-short'>que</span> <span class='scansion-syllable syllable-short'>de</span><span class='scansion-syllable syllable-long'>os</span> <span class='scansion-syllable syllable-short'>La</span><span class='scansion-syllable syllable-short'>ti</span><span class='scansion-syllable syllable-long'>o</span>, <span class='scansion-syllable syllable-short'>ge</span><span class='scansion-syllable syllable-short'>nus</span> <span class='scansion-syllable syllable-long'>un</span><span class='scansion-syllable syllable-short'>de</span> <span class='scansion-syllable syllable-short'>La</span><span class='scansion-syllable syllable-long'>ti</span><span class='scansion-syllable syllable-long'>num</span>,</p>",
							}, {
								n: '7',
								html: "<p><span class='scansion-syllable syllable-long'>Al</span><span class='scansion-syllable syllable-short'>ba</span><span class='scansion-syllable syllable-short'>ni</span><span class='scansion-syllable syllable-long'>que</span> <span class='scansion-syllable syllable-long'>pa</span><span class='scansion-syllable syllable-long'>tres</span>, <span class='scansion-syllable syllable-long'>at</span>que <span class='scansion-syllable syllable-long'>al</span><span class='scansion-syllable syllable-long'>tae</span> <span class='scansion-syllable syllable-long'>moe</span><span class='scansion-syllable syllable-short'>ni</span><span class='scansion-syllable syllable-short'>a</span> <span class='scansion-syllable syllable-long'>Ro</span><span class='scansion-syllable syllable-long'>mae</span>.</p>",
							}, {
								n: '8',
								html: "<p><span class='scansion-syllable syllable-long'>Mu</span><span class='scansion-syllable syllable-short'>sa</span>, <span class='scansion-syllable syllable-short'>mi</span><span class='scansion-syllable syllable-long'>hi</span> <span class='scansion-syllable syllable-long'>cau</span><span class='scansion-syllable syllable-long'>sas</span> <span class='scansion-syllable syllable-short'>me</span><span class='scansion-syllable syllable-short'>mo</span><span class='scansion-syllable syllable-long'>ra</span>, <span class='scansion-syllable syllable-long'>quo</span> <span class='scansion-syllable syllable-long'>nu</span><span class='scansion-syllable syllable-short'>mi</span><span class='scansion-syllable syllable-short'>ne</span> <span class='scansion-syllable syllable-long'>lae</span><span class='scansion-syllable syllable-long'>so</span>,</p>",
							}, {
								n: '9',
								html: "<p><span class='scansion-syllable syllable-long'>quid</span><span class='scansion-syllable syllable-short'>ve</span> <span class='scansion-syllable syllable-short'>do</span><span class='scansion-syllable syllable-long'>lens</span>, <span class='scansion-syllable syllable-short'>re</span><span class='scansion-syllable syllable-short'>gi</span><span class='scansion-syllable syllable-long'>na</span> <span class='scansion-syllable syllable-long'>de</span><span class='scansion-syllable syllable-long'>um</span> <span class='scansion-syllable syllable-long'>tot</span> <span class='scansion-syllable syllable-long'>vol</span><span class='scansion-syllable syllable-short'>ve</span><span class='scansion-syllable syllable-short'>re</span> <span class='scansion-syllable syllable-long'>ca</span><span class='scansion-syllable syllable-long'>sus</span></p>",
							}, {
								n: '10',
								html: "<p><span class='scansion-syllable syllable-long'>in</span><span class='scansion-syllable syllable-long'>sig</span><span class='scansion-syllable syllable-long'>nem</span> <span class='scansion-syllable syllable-short'>pi</span><span class='scansion-syllable syllable-short'>e</span><span class='scansion-syllable syllable-long'>ta</span><span class='scansion-syllable syllable-short'>te</span> <span class='scansion-syllable syllable-short'>vi</span><span class='scansion-syllable syllable-long'>rum</span>, <span class='scansion-syllable syllable-short'>tot</span> <span class='scansion-syllable syllable-short'>a</span><span class='scansion-syllable syllable-long'>di</span><span class='scansion-syllable syllable-short'>re</span> <span class='scansion-syllable syllable-short'>la</span><span class='scansion-syllable syllable-long'>bo</span><span class='scansion-syllable syllable-long'>res</span></p>",
							}, {
								n: '11',
								html: "<p><span class='scansion-syllable syllable-long'>im</span><span class='scansion-syllable syllable-short'>pu</span><span class='scansion-syllable syllable-short'>le</span><span class='scansion-syllable syllable-long'>rit</span>.  <span class='scansion-syllable syllable-long'>Tan</span><span class='scansion-syllable syllable-long'>tae</span>ne <span class='scansion-syllable syllable-short'>a</span><span class='scansion-syllable syllable-short'>ni</span><span class='scansion-syllable syllable-long'>mis</span> <span class='scansion-syllable syllable-long'>cae</span><span class='scansion-syllable syllable-long'>les</span><span class='scansion-syllable syllable-short'>ti</span><span class='scansion-syllable syllable-short'>bus</span> <span class='scansion-syllable syllable-long'>i</span><span class='scansion-syllable syllable-long'>rae</span>?</p>",
							},
						],
					},
				],
			},
		};
	},

	render() {
		const text = this.state.text;

		return (
			<div className="container">
				<div className="row">
					<div className="author-wrap">
						<h3 className="work-author">
							{text.author.english_full} (<em>{text.author.original_full}</em>)
						</h3>
					</div>
					{this.state.text.work.books.map((book) => (
						<div>
							<div className="title-wrap">
								<h1 className="work-title">{text.work.title} {book.book_n}</h1>
							</div>
							{ book.lines.map((line) => (
								<div className="text-wrap">
									<div className="text-html" dangerouslySetInnerHTML={{ __html: line.html }} />
									<div className="text-meta-options">
										<div className="text-meta-option">
											<i className="mdi mdi-alpha" />
											<span className="option-label">Scansion</span>
										</div>

										<div className="text-meta-option">
											<i className="mdi mdi-account" />
											<span className="option-label">Entities</span>
										</div>

										<div className="text-meta-option">
											<i className="mdi mdi-share-variant" />
											<span className="option-label">Related</span>
										</div>

										<div className="text-meta-option">
											<i className="mdi mdi-dots-horizontal" />
											<span className="option-label" />
										</div>


									</div>

								</div>
							))}
						</div>
					))}
				</div>
			</div>

		);
	},

});
