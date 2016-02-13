DefinitionWord = React.createClass({

  propTypes: {
    word: React.PropTypes.object.isRequired

  },

  render() {

     return (
          <div className="meta-item definition">
            <div className="show-more-toggle">
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

              {this.props.word.definitions.map(function(definition){

                <div className="meaning">
                  <span className="root">{definition.orthography}</span>
                  <span className="meaning-definition">{definition.senses}</span>

                  {definition.inflections.map(function(inflection){
                    <div className="forms">

                      {(() => {
                        switch (inflection.pos) {
                          case "noun":
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.declension.title} declension, {inflection.declension.case} {inflection.gender} {inflection.number}</span>

                          case "pronoun":
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.declension.title} declension, {inflection.declension.case} {inflection.gender} {inflection.number}</span>

                          case "adjective":
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.declension.title} declension, {inflection.declension.case} {inflection.gender} {inflection.number}</span>

                          case "verb":
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.conjugation} conjugation, {inflection.person} {inflection.number} {inflection.tense} {inflection.voice} {inflection.mood}</span>

                          case "participle":
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.declension.title} declension, {inflection.declension.case} {inflection.gender} {inflection.number} {inflection.tense} {inflection.voice}</span>

                          default:
                            return <span className="form">-{inflection.ending}: {inflection.pos} {inflection.form}</span>

                          }

                      })()}

                    </div>

                  })}
                </div>

              })}

            </div>

          </div>

     );
   }

});
