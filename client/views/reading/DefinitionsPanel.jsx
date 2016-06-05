
DefinitionsPanel = React.createClass({

  propTypes: {
    toggleDefinitions: React.PropTypes.bool,
    textNodes: React.PropTypes.array
  },
  getDefaultProps() {
    return {
      toggleDefinitions: false,
      textNodes: []
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    words = [];
    this.props.textNodes.map((textNode, i) => {
      definitions = {};
      Wordforms.find({texts: textNode._id}).fetch().map((wordform) => {
        if(definitions[wordform.word] == null){
          definitions[wordform.word] = [];
        }
        definition = Definitions.findOne({_id: wordform.definitions});
        if(definition != undefined){
          definitions[wordform.word].push(definition);
        }
      });
      for(key in definitions) {
        word = {};
        word["index"] = i;
        word["lemma"] = key;
        word["definitions"] = definitions[key];
        words.push(word);
      }
      });

    return {
      words : words
    };

  },


  renderDefinitions(){
    /*var words = [
      {
        _id : 123,
        lemma: "arma",
        definitions: [
          {
            orthography: ["armum", "armi"],
            senses: ["arms (pl.)", "weapons", "armor", "shield", "close fighting weapons", "equipment", "force"],
            inflections: [
              {
                pos: "noun",
                ending: "a",
                declension: {
                  title: "2nd",
                  "case": "nominative"
                },
                gender: "neuter",
                number: "plural"
              }, {
                pos: "noun",
                ending: "a",
                declension: {
                  title: "2nd",
                  "case": "vocative"
                },
                gender: "neuter",
                number: "plural"
              }, {
                pos: "noun",
                ending: "a",
                declension: {
                  title: "2nd",
                  "case": "accusative"
                },
                gender: "neuter",
                number: "plural"
              }
            ]
          }, {
            orthography: ["armo", "armare", "aramvi", "armatus"],
            senses: ["equip", "fit with armor", "arm", "strengthen", "rouse", "stir", "incite war", "rig (ship)"],
            inflections: [
              {
                pos: "verb",
                ending: "a",
                conjugation: "1st",
                person: "2nd",
                number: "singular",
                tense: "present",
                voice: "active",
                mood: "imperative"
              }
            ]
          }
        ]
      }, {
        _id : 124,
        lemma: "virum",
        definitions: [
          {
            orthography: ["virum", "viri"],
            senses: ["man", "husband", "hero", "person of courage", "honor", "nobility"],
            inflections: [
              {
                pos: "noun",
                ending: "um",
                declension: {
                  title: "2nd",
                  "case": "accusative"
                },
                gender: "masculine",
                number: "singular"
              }
            ]
          }, {
            orthography: ["vis", "viris"],
            senses: ["strength (bodily) (pl.)", "force", "power", "might", "violence", "resources", "large body"],
            inflections: [
              {
                pos: "noun",
                ending: "um",
                declension: {
                  title: "3rd",
                  "case": "genitive"
                },
                gender: "feminine",
                number: "plural"
              }
            ]
          }
        ]
      }
    ];
    */
    return this.data.words.map((word, i) => {
      return <DefinitionWord
        key={i}
        word={word} />;
    });

  },

  render() {
     return (
        <div className={(this.props.toggleDefinitions)? "slide-visible modal-panel definitions-panel paper-shadow"
          :"modal-panel definitions-panel paper-shadow"}>
          <div className="modal-panel-inner definitions-panel-inner">
            <div className="definitions panel-items">
              {this.renderDefinitions()}
            </div>

            {this.data.words.length === 0 ?
                <span className="no-results no-results-definitions">No definitions available.</span>
              : null }
          </div>
         </div>


     );
   }

});
