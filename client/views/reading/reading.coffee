
Template.reading.helpers(

    work : () -> {

        title : "Histories",
        slug : "histories",

        author : {
            english_full : "Herodotus",
            original_full : "Ἡρόδοτος"

          },

        edition : {
            editor : "R. A. B. Mynors",
            year : 1913,

          },

        meta : "book-chapter-section",

        books : [{
                type : "book",
                book_n : "I",

                chapters : [{

                        type : "chapter",
                        chapter_n : "I",
                        sections : [{

                                  html : "<p>Ἡροδότου Ἁλικαρνησσέος ἱστορίης ἀπόδεξις ἥδε, ὡς μήτε τὰ γενόμενα ἐξ ἀνθρώπων τῷ χρόνῳ ἐξίτηλα γένηται, μήτε ἔργα μεγάλα τε καὶ θωμαστά, τὰ μὲν Ἕλλησι τὰ δὲ βαρβάροισι ἀποδεχθέντα, ἀκλεᾶ γένηται, τά τε ἄλλα καὶ δι᾽ ἣν αἰτίην ἐπολέμησαν ἀλλήλοισι.</p>",
                                  section_n : 1
                                },{
                                  html : "<p>Περσέων μέν νυν οἱ λόγιοι Φοίνικας αἰτίους φασὶ γενέσθαι τῆς διαφορῆς. τούτους γὰρ ἀπὸ τῆς Ἐρυθρῆς καλεομένης θαλάσσης ἀπικομένους ἐπὶ τήνδε τὴν θάλασσαν, καὶ οἰκήσαντας τοῦτον τὸν χῶρον τὸν καὶ νῦν οἰκέουσι, αὐτίκα ναυτιλίῃσι μακρῇσι ἐπιθέσθαι, ἀπαγινέοντας δὲ φορτία Αἰγύπτιά τε καὶ Ἀσσύρια τῇ τε ἄλλῃ ἐσαπικνέεσθαι καὶ δὴ καὶ ἐς Ἄργος.</p>",
                                  section_n : 2
                                },{
                                  html : "<p>τὸ δὲ Ἄργος τοῦτον τὸν χρόνον προεῖχε ἅπασι τῶν ἐν τῇ νῦν Ἑλλάδι καλεομένῃ χωρῇ. ἀπικομένους δὲ τούς Φοίνικας ἐς δὴ τὸ Ἄργος τοῦτο διατίθεσθαι τὸν φόρτον.</p>",
                                  section_n : 3
                                },{
                                  html : "<p>πέμπτῃ δὲ ἢ ἕκτῃ ἡμέρῃ ἀπ᾽ ἧς ἀπίκοντο, ἐξεμπολημένων σφι σχεδόν πάντων, ἐλθεῖν ἐπὶ τὴν θάλασσαν γυναῖκας ἄλλας τε πολλάς καὶ δὴ καὶ τοῦ βασιλέος θυγατέρα: τὸ δέ οἱ οὔνομα εἶναι, κατὰ τὠυτὸ τὸ καὶ Ἕλληνές λέγουσι, Ἰοῦν τὴν Ἰνάχου:</p>",
                                  section_n : 4
                                },{
                                  html : "<p>ταύτας στάσας κατά πρύμνην τῆς νεὸς ὠνέεσθαι τῶν φορτίων τῶν σφι ἦν θυμός μάλιστα: καὶ τοὺς Φοίνικας διακελευσαμένους ὁρμῆσαι ἐπ᾽ αὐτάς. τὰς μὲν δὴ πλεῦνας τῶν γυναικῶν ἀποφυγεῖν, τὴν δὲ Ἰοῦν σὺν ἄλλῃσι ἁρπασθῆναι. ἐσβαλομένους δὲ ἐς τὴν νέα οἴχεσθαι ἀποπλέοντας ἐπ᾽ Αἰγύπτου.</p>",
                                  section_n : 5
                              }]

                      }]

              }]
      }
  )


Template.headerReading.events = (

	"click .meta-toggle": (e) ->
    $target = $(e.target);

    if !$target.hasClass("meta-toggle")
      $target = $target.parents(".meta-toggle");

    if $target.hasClass("checked")
      $target.removeClass("checked");

    else
      $target.addClass("checked");

    if $target.data().type == "definitions"
      console.log("definitions");

    else if $target.data().type == "commentary"
      console.log("commentary");

    else if $target.data().type == "translations"
      console.log("translations");
)
