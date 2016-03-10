ReadingProse = React.createClass({

  propTypes: {
    work: React.PropTypes.object.isRequired,
    text: React.PropTypes.array.isRequired
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
                        html: "<p><span class='intext-entity' data-eid='1'>Ἡροδότου</span> <span class='intext-entity' data-eid='2'>Ἁλικαρνησσέος</span> ἱστορίης ἀπόδεξις ἥδε, ὡς μήτε τὰ γενόμενα ἐξ ἀνθρώπων τῷ χρόνῳ ἐξίτηλα γένηται, μήτε ἔργα μεγάλα τε καὶ θωμαστά, τὰ μὲν Ἕλλησι τὰ δὲ βαρβάροισι ἀποδεχθέντα, ἀκλεᾶ γένηται, τά τε ἄλλα καὶ δι᾽ ἣν αἰτίην ἐπολέμησαν ἀλλήλοισι.</p>",
                        n: 1
                      }, {
                        html: "<p>Περσέων μέν νυν οἱ λόγιοι <span class='intext-related-passage' data-related='1'>Φοίνικας αἰτίους φασὶ γενέσθαι τῆς διαφορῆς.</span> τούτους γὰρ ἀπὸ τῆς Ἐρυθρῆς καλεομένης θαλάσσης ἀπικομένους ἐπὶ τήνδε τὴν θάλασσαν, καὶ οἰκήσαντας τοῦτον τὸν χῶρον τὸν καὶ νῦν οἰκέουσι, αὐτίκα ναυτιλίῃσι μακρῇσι ἐπιθέσθαι, ἀπαγινέοντας δὲ φορτία Αἰγύπτιά τε καὶ Ἀσσύρια τῇ τε ἄλλῃ ἐσαπικνέεσθαι καὶ δὴ καὶ ἐς Ἄργος.</p>",
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

  makeBooks() {
    let books = [];

    this.props.text.forEach(function(text_obj){
        var text_obj_book = books.find(function(book){
                        return book.n === text_obj.book;
                      });
        if(text_obj_book){
          text_obj_book.text.push(text_obj);

        }else {
          books.push({
              n : text_obj.book,
              text : [text_obj]
            });

        }

      });

    return books;

  },

  renderBooks(book) {
    return this.makeBooks().map((book) => {
      return <ReadingBook
              key={book._id}
              work={this.props.work}
              book={book}
              />
          });

  },


  render() {
    let work = this.props.work;

    return (
        <div className="reading-container">

          <div className="author-wrap">
            <h3 className="work-author">
              {work.author} (<em>{work.author}</em>)
            </h3>
          </div>

          {this.renderBooks()}

        </div>

    );

  }

});
