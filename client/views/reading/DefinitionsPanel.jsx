var {
    Toggle
    } = MUI;

DefinitionsPanel = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getMeteorData() {
    let query = {};

    return {
      words : [{}]
    };

  },
  handleDefinitionScroll() {
    let scrollFactor = $(window).scrollTop()/(document.body.scrollHeight - document.body.offsetHeight);
    let definitionsHiddenHeight = $(".definitions").prop('scrollHeight') - $(".definitions").prop('offsetHeight');
    $(".definitions").scrollTop(scrollFactor * definitionsHiddenHeight);
  },

  toggleDefinitionScroll(event, toggled){
    console.log("toggleDefinitionScroll", toggled);
    if(toggled){
      $(window).on("scroll", this.handleDefinitionScroll);
    }
    else{
      $(window).off("scroll", this.handleDefinitionScroll);
    }
  },

  renderDefinitions(){
    var words = [
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

    return words.map((word) => {
      return <DefinitionWord
        key={word._id}
        word={word} />;
    });

  },

  render() {

     return (
        <div className="modal-panel-inner definitions-panel-inner">
          <div className="toggle-item">
            <Toggle
             label="Auto Scroll"
             labelPosition="right"
             onToggle={this.toggleDefinitionScroll}/>
          </div>
          <div className="definitions panel-items">
            {this.renderDefinitions()}
          </div>

          {this.data.words.length === 0 ?
              <span className="no-results no-results-definitions">No definitions available.</span>
            : null }

        </div>


     );
   }

});
