DefinitionWord = React.createClass({

  propTypes: {
    word: React.PropTypes.object.isRequired

  },

  getInitialState(){
    return {
      showMore: false
    }

  },

  toggleShowMore(e) {
    this.setState({
        showMore: ! this.state.showMore
    })

  },

  render() {
    const wordClassName = "meta-item panel-item definition " + (this.state.showMore ? "expanded" : "");
    return (
      <div className={wordClassName}>
        <div className="show-more-toggle" onClick={this.toggleShowMore}>
          <i className="mdi mdi-plus paper-shadow"></i>
          <i className="mdi mdi-minus paper-shadow"></i>

        </div>

        <div className="definition-title meta-item-title">
          <h4 className="word">
            {this.props.word.lemma}
          </h4>
          <a className="definition-link" href="http://www.perseus.tufts.edu/hopper/morph?l={this.props.word.lemma}&la=la" target="_blank">
            Perseus
          </a>
        </div>

        <div className="word-meanings">
          {this.props.word.definitions.map(function(definition, i){
            return <div className="meaning" key={i}>
              <span className="root">{definition.headword}</span>
              <span className="meaning-definition">{definition.definition}</span>

              <div className="forms">
                <span className="form">-{definition.pos}</span>
              </div>

            </div>

          })}

        </div>

        <div className="bottom-gradient"></div>
      </div>
    );
  }

});
