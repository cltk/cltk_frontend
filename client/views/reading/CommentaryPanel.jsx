
CommentaryPanel = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData(){
    return {
      comments: [{}]

    };


  },

  renderComments(){
    // Get tasks from this.data.tasks
    var comments = [{
        _id : 1233,
        authors : [{
          name_short : "How",
          name_full : "W. W. How"
        },{
          name_short : "Wells",
          name_full : "J. Wells"
        }],
        work : {
          slug : "histories",
          title : "Histories"
        },
        subwork : {
          slug : "1",
          n : 1
        },
        text_n : {
          from : 1,
          to : null
        },
        content : "THE opening sentence embodies the title in the work. Cf. the opening words of Hecataeus (fr. 332) Ἑ. Μιλήσιος ὧδε μυθεῖται and Thuc. i. 1. Θουρίου (vid. app. crit.) seems to have been the usual reading at the end of the fourth century (cf. Duris of Samos, fr. 57, F. H. G. ii. 482). Plutarch (Mor. 605) writes Ἡ. Ἁλικαρνασσέως ἱστορίης ἀπόδειξις ἥδε: πολλοί μεταγράφουσιν Ἡροδότου Θουρίου, μετῴκησε γὰρ εἰς Θουρίους, which seems to be intended to reconcile the two traditions. The Alexandrine librarians, however, must have had good reasons for restoring Ἁλικ. in the text. (For H.'s birth, &c., cf. Introd. §§ 1-2.)<br>ἱστορίης: properly ‘inquiry’, and so the ‘result of inquiry’ (ii. 99. 1); only once in H.=‘history’ (vii. 96. 1) in the modern sense. Croiset (Litt. Grec. ii. 589) well says that the word ‘marks a literary revolution’; the λογογράφοι had written down the current stories, the historian sets out to ‘find’ the truth.<br>The reason given for writing is characteristic of H.; he is the born chronicler, and his interest is in the past: Thucydides (i. 22. 4) is the scientific historian, and his eye is on the future—τῶν γενομένων τὸ σαφὲς σκοπεῖν καὶ τῶν μελλόντων ποτὲ αὖθις κατὰ τὸ ἀνθρώπινον τοιούτων καὶ παραπλησίων ἔσεσθαι.<br>The ἔργα are the permanent results, ‘monuments’, &c.<br>τά τε ἄλλα is in loose apposition to τὰ γενόμενα and ἔργα."
      },{
        _id : 1234,
        authors : [{
          name_short : "How",
          name_full : "W. W. How"
        },{
          name_short : "Wells",
          name_full : "J. Wells"
        }],
        work : {
          slug : "histories",
          title : "Histories"
        },
        subwork : {
          slug : "1",
          n : 1
        },
        text_n : {
          from : 1,
          to : null
        },
        content : "οἱ λόγιοι (= ‘skilled in history’) cf. ii. 3. 1. H.'s story is decidedly Greek, and not Persian, in colouring: cf. vi. 54; vii. 150. 2 for a like (supposed) Persian acquaintance with Greek myths; a similar knowledge is attributed to the Egyptians ii. 91. 5. Such combinations certainly come from Greek sources, not native ones.<br>Φοίνικας. The name (whence Lat. ‘Poenus’) seems to be pure Greek; it certainly occurs in places where there is no trace of foreign influence; e. g. the harbour Φοινικοῦς, near Erythrae (Thuc. viii. 34), a stream near Thermopylae, &c. (Meyer, ii. 92). As applied to a race, it may well be a colour name, ‘Red men’; cf. Αἰθίοψ and ‘White Syrians’ (6. 1 n.). This derivation, however, is not inconsistent with it being also a foreign name. The old connexion with ‘Fenchu’, supposed to occur at Karnak in the inscriptions of Thothmes III, is now given up; others see in the name the Egyptian ‘Punt’, the land of South Arabia and East Africa. This last is the view of E. Gläser, Punt und die Südarabischen Reiche (1899), who holds that from this ‘original home’ (p. 62) the Phoenicians spread both north (v. i.) and south to Mashonaland and Socotra; he says (p. 65) the gods of Phoenicia can be almost all easily recognized as South Arabian. This derivation would agree with the legend of their migration from the shores of the Indian Ocean (vii. 89. 2), which first occurs here; for a later version cf. Strabo, 766 (based on Androsthenes, a seaman of Alexander), who says that the islands of Tyros (v. l. Tylos) and Arados (hod. Bahrein) in the Persian Gulf claimed to be the mother cities of the Phoenician towns; he elsewhere (35) rejects the story. Justin (xviii. 3) actually professes to give their route when migrating: for a discussion of these passages cf. Maspero, ii. 63 seq., who accepts the general fact of the migration from the south-east, and dates it soon after 3000 B. C., on the evidence of ii. 44. 3. General probability confirms this northwest movement of the Semitic peoples, though Meyer (i. 356) rejects the whole story. The position of the Phoenicians, wedged in on the narrow strip of coast, shows they were the earliest among the Semitic migrants (cf. the position of the Celtic peoples in Wales, Brittany, &c.). But beyond this all is uncertain.<br>Ἐρυθρῆς θαλάσσης (cf. ii. 8. 1 et pass.). H. means by this all the water south-east and south of Asia; our ‘Red Sea’ was its western limit, and has the special name of Ἀράβιος κόλπος (ii. 102. 2 et pass.); beyond it to the south-west lay ἡ νοτίη θάλασσα (iv. 42. 3); the Persian Gulf proper has no special name in H. (cf. i. 180. 1, where the Euphrates runs into the Ἑρυθρὴ θάλασσα). The name ‘Red Sea’ is Egyptian, and is derived perhaps from the colour of the sand."

      },{
        _id : 1235,
        authors : [{
          name_short : "How",
          name_full : "W. W. How"
        },{
          name_short : "Wells",
          name_full : "J. Wells"
        }],
        work : {
          slug : "histories",
          title : "Histories"
        },
        subwork : {
          slug : "1",
          n : 1
        },
        text_n : {
          from : 2,
          to : null
        },
        content : "The pre-eminence of Argos in early times is an inference from Homer, and even more from the Cyclic poems, e.g. the Thebais and the Epigoni (cf. v. 67 n.). Hellas did not obtain its name till after the Dorian invasion (cf. i. 58 nn.).<br>φόρτον. For the scene here described cf. Od. xv. 416 (Φοίνικες） μυρἴ ἄγοντες ἀθύρματα νηὶ μελαίνῃ."


      }];


    return comments.map((comment) => {
      return <Comment
        key={comment._id}
        comment={comment} />;
    });

  },

  render() {

     return (
       <div className="commentary-panel-inner">

         <div className="comments">
           {this.renderComments()}

         </div>

          {this.data.comments.length === 0 ?
              <span className="no-results no-results-commentary">No commentary available.</span>
            : null }

       </div>

     );
   }

});
