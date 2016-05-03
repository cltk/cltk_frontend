
ReadingLayout = React.createClass({
	render(){
		return(
			<div className="cltk-layout reading-layout">
				<HeaderReading />
				<main>
					{this.props.content}
				</main>

				<div className="reading-loading-area">
					<div className="well-spinner"></div>
				</div>

			  <div id="annotate-widget">
			  </div>

			  <div id="definitions-panel" className="modal-panel definitions-panel paper-shadow">
			  </div>

			  <div id="commentary-panel" className="modal-panel commentary-panel paper-shadow">
			  </div>

				<Footer/>
			</div>
			);
	}

});
