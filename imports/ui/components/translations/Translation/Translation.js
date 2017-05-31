Translation = React.createClass({

	propTypes: {
		translation: React.PropTypes.object.isRequired,
	},

	render() {
		const translationClassName = 'meta-item translation';

		return (
			<div className={translationClassName}>
				{this.props.translation.text.map((text, i) => (
					<p
						key={i} data-num={i} className="translation-text"
						dangerouslySetInnerHTML={{ __html: text }}
					/>
				))}

			</div>

		);
	},

});
