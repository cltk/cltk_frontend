Template.definitionsPanel.helpers({
  words: function() {
    return [
      {
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
  }
});
