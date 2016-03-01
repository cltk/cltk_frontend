ReadingProse = React.createClass({

  propTypes: {
    text: React.PropTypes.object.isRequired
  },

  getInitialState(){
    return {
      text : {
        title: "Histories",
        slug: "histories",
        author: {
          english_full: "Herodotus",
          original_full: "Ἡρόδοτος"
        },
        edition: {
          editor: "R. A. B. Mynors",
          year: 1913
        },
        meta: "book-chapter-section",
        books: [{
              type: "book",
              book_n: "I",
              chapters: [{
                  type: "chapter",
                  chapter_n: "I",
                  sections: [{
                        html: "<p>Ἡροδότου Ἁλικαρνησσέος ἱστορίης ἀπόδεξις ἥδε, ὡς μήτε τὰ γενόμενα ἐξ ἀνθρώπων τῷ χρόνῳ ἐξίτηλα γένηται, μήτε ἔργα μεγάλα τε καὶ θωμαστά, τὰ μὲν Ἕλλησι τὰ δὲ βαρβάροισι ἀποδεχθέντα, ἀκλεᾶ γένηται, τά τε ἄλλα καὶ δι᾽ ἣν αἰτίην ἐπολέμησαν ἀλλήλοισι.</p>",
                        n: 1
                      }, {
                        html: "<p>Περσέων μέν νυν οἱ λόγιοι Φοίνικας αἰτίους φασὶ γενέσθαι τῆς διαφορῆς. τούτους γὰρ ἀπὸ τῆς Ἐρυθρῆς καλεομένης θαλάσσης ἀπικομένους ἐπὶ τήνδε τὴν θάλασσαν, καὶ οἰκήσαντας τοῦτον τὸν χῶρον τὸν καὶ νῦν οἰκέουσι, αὐτίκα ναυτιλίῃσι μακρῇσι ἐπιθέσθαι, ἀπαγινέοντας δὲ φορτία Αἰγύπτιά τε καὶ Ἀσσύρια τῇ τε ἄλλῃ ἐσαπικνέεσθαι καὶ δὴ καὶ ἐς Ἄργος.</p>",
                        n: 2
                      }, {
                        html: "<p>τὸ δὲ Ἄργος τοῦτον τὸν χρόνον προεῖχε ἅπασι τῶν ἐν τῇ νῦν Ἑλλάδι καλεομένῃ χωρῇ. ἀπικομένους δὲ τούς Φοίνικας ἐς δὴ τὸ Ἄργος τοῦτο διατίθεσθαι τὸν φόρτον.</p>",
                        n: 3
                      }, {
                        html: "<p>πέμπτῃ δὲ ἢ ἕκτῃ ἡμέρῃ ἀπ᾽ ἧς ἀπίκοντο, ἐξεμπολημένων σφι σχεδόν πάντων, ἐλθεῖν ἐπὶ τὴν θάλασσαν γυναῖκας ἄλλας τε πολλάς καὶ δὴ καὶ τοῦ βασιλέος θυγατέρα: τὸ δέ οἱ οὔνομα εἶναι, κατὰ τὠυτὸ τὸ καὶ Ἕλληνές λέγουσι, Ἰοῦν τὴν Ἰνάχου:</p>",
                        n: 4
                      }, {
                        html: "<p>ταύτας στάσας κατά πρύμνην τῆς νεὸς ὠνέεσθαι τῶν φορτίων τῶν σφι ἦν θυμός μάλιστα: καὶ τοὺς Φοίνικας διακελευσαμένους ὁρμῆσαι ἐπ᾽ αὐτάς. τὰς μὲν δὴ πλεῦνας τῶν γυναικῶν ἀποφυγεῖν, τὴν δὲ Ἰοῦν σὺν ἄλλῃσι ἁρπασθῆναι. ἐσβαλομένους δὲ ἐς τὴν νέα οἴχεσθαι ἀποπλέοντας ἐπ᾽ Αἰγύπτου.</p>",
                        n: 5
                      }]
                }]
            }]
      }
    };

  },

  renderBooks(book) {
    return this.state.text.books.map((book) => {
      return <ReadingBook
              key={book._id}
              book={book}
              text={this.state.text} />
          });

  },


  render() {
    let text = this.state.text;

    return (
        <div className="reading-container">

          <div className="author-wrap">
            <h3 className="work-author">
              {text.author.english_full} (<em>{text.author.original_full}</em>)
            </h3>
          </div>

          {this.renderBooks()}

        </div>

    );

  }

});
