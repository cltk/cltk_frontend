MasterLayout = React.createClass({

	render(){
		return(
			<div className="cltk-layout master-layout">
				<Header />
				<main>
					{this.props.content}
				</main>
				<Footer/>
			</div>
			);
		}

});
