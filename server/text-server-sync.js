/*
 * Sync text content from the CLTK API for text from the JSON
 *
 */


// Get the available languages from the API
function getLanguages(){
  return new Promise(function(resolve, reject){
    HTTP.get('http://api.cltk.org:5000/lang', {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });
}

// Get the corpora for each language
function getCorpora(language){

  return new Promise(function(resolve, reject){
    HTTP.get("http://api.cltk.org:5000/lang/" + language.slug + "/corpus", {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

// Get the authors for each corpus
function getAuthors(corpus){

  return new Promise(function(resolve, reject){
    HTTP.get("http://api.cltk.org:5000/lang/" + corpus.language + "/corpus/" + corpus.slug + "/author", {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

// Get the text list for each author
function getWorks(author){

  return new Promise(function(resolve, reject){
    HTTP.get("http://api.cltk.org:5000/lang/" + author.language + "/corpus/" + author.corpus + "/author/" + author.slug + "/text", {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

// Get each invidual text in the text list
function getText(work){
  return new Promise(function(resolve, reject){
    HTTP.get("http://api.cltk.org:5000/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug, {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

// Get all the available languages from the API synchronously
function getLanguagesSync(){

    response = HTTP.get('http://api.cltk.org:5000/lang')
    let languages = response.data.languages;
    languages.forEach(function(language){
        let existing = Languages.findOne({slug:language});

        // Insert languages
        if (!existing){
          Languages.insert({
              title : language,
              slug : language
            });
        }

      });

    console.log(" -- -- synced", languages.length, "languages");
    return Promise.resolve(1);

}

// Get the corpora for all languages synchronously
function getCorporaSync(res){

    Languages.find().fetch().forEach(function(language){

      response = HTTP.get("http://api.cltk.org:5000/lang/" + language.slug + "/corpus")
      let corpora = response.data.corpora;
      corpora.forEach(function(corpus){
          let existing = Corpora.findOne({slug:corpus, language:language.slug});

          // If corpus is not already in the database, insert it
          if (!existing){
            Corpora.insert({
                title : corpus,
                language : language.slug,
                slug : corpus
              });
          }

        });

      console.log(" -- -- synced", corpora.length, "corpora");

    });

    return Promise.resolve(res+1);

}

// Get the authors for all corpora synchronously
function getAuthorsSync(res){

    Corpora.find().fetch().forEach(function(corpus){

      response = HTTP.get("http://api.cltk.org:5000/lang/" + corpus.language + "/corpus/" + corpus.slug + "/author")
      let authors = response.data.authors;

      authors.forEach(function(author){
          let existing = Authors.findOne({slug:author});

          // If the author is not in the datbase already, add it
          if (!existing){
            Authors.insert({
                title : author,
                slug : author,
                language : corpus.language,
                corpus : corpus.slug
              });
          }

        });
      console.log(" -- -- synced", authors.length, "authors");

    });

    return Promise.resolve(res+2);

}

// Get the text list for all authors synchronously
function getWorksSync(res){

    Authors.find().fetch().forEach(function(author){

      response = HTTP.get("http://api.cltk.org:5000/lang/" + author.language + "/corpus/" + author.corpus + "/author/" + author.slug + "/text")
      let works = response.data.texts;
      works.forEach(function(work){
          let existing = Works.findOne({slug:work});

          // If this work is not in the database yet, add it
          if (!existing){
            Works.insert({
                title : work,
                slug : work,
                author : author.slug,
                language : author.language,
                corpus : author.corpus
              });
          }

        });

      console.log(" -- -- synced", works.length, "works");

    });

    return Promise.resolve(res+3);

}

// Get invidual text in all the text lists synchronously
function getTextSync(res){

    Works.find().fetch().forEach(function(work){

      // For each work, fetch the document text from the API
      response = HTTP.get("http://api.cltk.org:5000/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug)
      let text_objs = response.data.text;
      let count = 0;

      /*
       * Parse the input document based on the document structure denoted in the
       * meta field
       */
      if (["chapter", "fragment", "line"].indexOf(response.data.meta) >= 0){
        for ( n_1_key in text_objs ){
          //
          // Only adding the first 100 text chunks / objects makes debugging the sync script
          // and development easier
          //
          if (count < 100){

            var existing = Texts.findOne({
                n_1 : parseInt(n_1_key),
                author : work.author,
                language : work.language,
                corpus : work.corpus,
                work : work.slug,
              });

            // If text object is not yet exiting in the database, add it
            if (!existing){
              Texts.insert({
                  n_1 : parseInt(n_1_key),
                  author : work.author,
                  language : work.language,
                  corpus : work.corpus,
                  work : work.slug,
                  text : text_objs[n_1_key],
                  html : text_objs[n_1_key],
                });
            }

            count++;
          }

        } // n_1

      }else if (["poem-line", "book-line", "chapter-section", "book-chapter", "fragment-line"].indexOf(response.data.meta) >= 0) {
        for ( n_1_key in text_objs ){
          for ( n_2_key in text_objs[n_1_key] ){
            //
            // Only adding the first 100 text chunks / objects makes debugging the sync script
            // and development easier
            //
            if (count < 100){
              var existing = Texts.findOne({
                  n_1 : parseInt(n_1_key),
                  n_2 : parseInt(n_2_key),
                  author : work.author,
                  language : work.language,
                  corpus : work.corpus,
                  work : work.slug,
                });

              // If text object is not yet exiting in the database, add it
              if (!existing){
                Texts.insert({
                    n_1 : parseInt(n_1_key),
                    n_2 : parseInt(n_2_key),
                    author : work.author,
                    language : work.language,
                    corpus : work.corpus,
                    work : work.slug,
                    text : text_objs[n_1_key][n_2_key],
                    html : text_objs[n_1_key][n_2_key],
                  });
              }

              count++;
            }

          } // n_2
        } // n_1

      }else if (["book-chapter-section"].indexOf(response.data.meta) >= 0){
        for ( n_1_key in text_objs ){
          for ( n_2_key in text_objs[n_1_key] ){
            for ( n_3_key in text_objs[n_2_key] ){
              console.log('qux');
              //
              // Only adding the first 100 text chunks / objects makes debugging the sync script
              // and development easier!
              //
              if (count < 100){
                var existing = Texts.findOne({
                    n_1 : parseInt(n_1_key),
                    n_2 : parseInt(n_2_key),
                    n_3 : parseInt(n_3_key),
                    author : work.author,
                    language : work.language,
                    corpus : work.corpus,
                    work : work.slug,
                  });

                // If text object is not yet exiting in the database, add it
                if (!existing){
                  Texts.insert({
                      n_1 : parseInt(n_1_key),
                      n_2 : parseInt(n_2_key),
                      n_3 : parseInt(n_3_key),
                      author : work.author,
                      language : work.language,
                      corpus : work.corpus,
                      work : work.slug,
                      text : text_objs[n_1_key][n_2_key][n_3_key],
                      html : text_objs[n_1_key][n_2_key][n_3_key],
                    });
                }

                count++;
              }

            } // n_3
          } // n_2
        } // n_1

        console.log(" -- -- synced", count, "text items" );

      }else {
        // Provide information about an unregonized document structure
        console.error(" -- -- unregonized document structure for work", work);

      }

    });

    console.log("result:", res);

}

// Removes all content synced from the API
function resetDb(){
  Languages.remove({})
  Corpora.remove({})
  Authors.remove({})
  Works.remove({})
  Texts.remove({})

}

/*
 * Sync content from the API with parallel requests to each level of the API
 */
function doSyncParallel(){

  // Get all languages manifest in the API
  getLanguages()
    .then(function(response){
      let languages = response.data.languages;
      languages.forEach(function(language){
          let existing = Languages.findOne({slug:language});

          // Insert languages
          if (!existing){
            Languages.insert({
                title : language,
                slug : language
              });
          }

        });

      console.log(" -- -- synced", languages.length, "languages");

    }, function(error){
      console.error(" -- -- error with syncing languages:", error);

    });

  // Get all corpora for each language in the manifest from the API
  Languages.find().fetch().forEach(function(language){
    getCorpora(language)
      .then(function(response){
        let corpora = response.data.corpora;
        corpora.forEach(function(corpus){
            let existing = Corpora.findOne({slug:corpus, language:language.slug});

            // If corpus is not already in the database, insert it
            if (!existing){
              Corpora.insert({
                  title : corpus,
                  language : language.slug,
                  slug : corpus
                });
            }

          });
        console.log(" -- -- synced", corpora.length, "corpora");

      }, function(error){
        console.error(" -- -- error with syncing corpora:", error);

      });

  });

  // Get all authors for each corpus manifest in the API
  Corpora.find().fetch().forEach(function(corpus){
    getAuthors(corpus)
      .then(function(response){
        let authors = response.data.authors;

        authors.forEach(function(author){
            let existing = Authors.findOne({slug:author});

            // If the author is not in the datbase already, add it
            if (!existing){
              Authors.insert({
                  title : author,
                  slug : author,
                  language : corpus.language,
                  corpus : corpus.slug
                });
            }

          });
        console.log(" -- -- synced", authors.length, "authors");

      }, function(error){
        console.error(" -- -- error with syncing authors:", error);

      });

  });

  // Get all works for each author manifest in the API
  Authors.find().fetch().forEach(function(author){
    getWorks(author)
      .then(function(response){
        let works = response.data.texts;
        works.forEach(function(work){
            let existing = Works.findOne({slug:work});

            // If this work is not in the database yet, add it
            if (!existing){
              Works.insert({
                  title : work,
                  slug : work,
                  author : author.slug,
                  language : author.language,
                  corpus : author.corpus
                });
            }

          });
        console.log(" -- -- synced", works.length, "works");

      }, function(error){
        console.error(" -- -- error with syncing works:", error);

      });

  });

  // Get the document text for each work manifest in the API
  Works.find().fetch().forEach(function(work){
    // For each work, fetch the document text from the API
    getText(work)
      .then(function(response){
        let text_objs = response.data.text;
        let count = 0;

          /*
           * Parse the input document based on the document structure denoted in the
           * meta field
           */
          if (["chapter", "fragment", "line"].indexOf(response.data.meta) >= 0){
            for ( n_1_key in text_objs ){
              //
              // Only adding the first 100 text chunks / objects makes debugging the sync script
              // and development easier
              //
              if (count < 100){

                var existing = Texts.findOne({
                    n_1 : parseInt(n_1_key),
                    author : work.author,
                    language : work.language,
                    corpus : work.corpus,
                    work : work.slug,
                  });

                // If text object is not yet exiting in the database, add it
                if (!existing){
                  Texts.insert({
                      n_1 : parseInt(n_1_key),
                      author : work.author,
                      language : work.language,
                      corpus : work.corpus,
                      work : work.slug,
                      text : text_objs[n_1_key],
                      html : text_objs[n_1_key],
                    });
                }

                count++;
              }

            } // n_1

          }else if (["poem-line", "book-line", "chapter-section", "book-chapter", "fragment-line"].indexOf(response.data.meta) >= 0) {
            for ( n_1_key in text_objs ){
              for ( n_2_key in text_objs[n_1_key] ){
                //
                // Only adding the first 100 text chunks / objects makes debugging the sync script
                // and development easier
                //
                if (count < 100){
                  var existing = Texts.findOne({
                      n_1 : parseInt(n_1_key),
                      n_2 : parseInt(n_2_key),
                      author : work.author,
                      language : work.language,
                      corpus : work.corpus,
                      work : work.slug,
                    });

                  // If text object is not yet exiting in the database, add it
                  if (!existing){
                    Texts.insert({
                        n_1 : parseInt(n_1_key),
                        n_2 : parseInt(n_2_key),
                        author : work.author,
                        language : work.language,
                        corpus : work.corpus,
                        work : work.slug,
                        text : text_objs[n_1_key][n_2_key],
                        html : text_objs[n_1_key][n_2_key],
                      });
                  }

                  count++;
                }

              } // n_2
            } // n_1

          }else if (["book-chapter-section"].indexOf(response.data.meta) >= 0){
            for ( n_1_key in text_objs ){
              for ( n_2_key in text_objs[n_1_key] ){
                for ( n_3_key in text_objs[n_2_key] ){
                  console.log('qux');
                  //
                  // Only adding the first 100 text chunks / objects makes debugging the sync script
                  // and development easier!
                  //
                  if (count < 100){
                    var existing = Texts.findOne({
                        n_1 : parseInt(n_1_key),
                        n_2 : parseInt(n_2_key),
                        n_3 : parseInt(n_3_key),
                        author : work.author,
                        language : work.language,
                        corpus : work.corpus,
                        work : work.slug,
                      });

                    // If text object is not yet exiting in the database, add it
                    if (!existing){
                      Texts.insert({
                          n_1 : parseInt(n_1_key),
                          n_2 : parseInt(n_2_key),
                          n_3 : parseInt(n_3_key),
                          author : work.author,
                          language : work.language,
                          corpus : work.corpus,
                          work : work.slug,
                          text : text_objs[n_1_key][n_2_key][n_3_key],
                          html : text_objs[n_1_key][n_2_key][n_3_key],
                        });
                    }

                    count++;
                  }

                } // n_3
              } // n_2
            } // n_1

          console.log(" -- -- synced", count, "text items" );

        }else {
          // Provide information about an unregonized document structure
          console.error(" -- -- unregonized document structure for work", work);

        }

      }, function(error){
        // Do better error handling here in the future
        console.error(" -- -- error with syncing text items:", error);

      });

  });

}

/*
 * Execute a list of Promise return functions in series
 */
function pseries(list) {

  var p = Promise.resolve();

  return list.reduce(function(pacc, fn) {
    return pacc = pacc.then(fn);
  }, p);

}

/*
 * Sync content from the API with sequential requests
 */
function doSyncSequence(){

  // Promise returning functions to execute
  var fnlist = [getLanguagesSync, getCorporaSync, getAuthorsSync, getWorksSync, getTextSync];

  pseries(fnlist);

}

if ( Meteor.isServer ) {
  Meteor.startup(function () {
    // Start sync on application startup

    // If no languages have been synced from the CLTK API, then assume that no
    // content is in the database and sync content sequentially, languages to texts
    if( !Languages.find().fetch().length ){
      var date = new Date();
      console.log(" -- Initial sequence sync with text server API started at", date.toString());
      doSyncSequence();
    }

    // If you want to while development is ongoing for doSyncSequence(), you can use these
    //resetDb();
    //doSyncParallel();

    /*
     * Set interval to check and sync text content (currently 90 mins)
     */
    Meteor.setInterval(function() {

      // Sync content from the text server with parallel requests to the API
      var date = new Date();
      console.log(" -- Interval sync with text server API started at", date.toString());
      //doSyncParallel();

    },540000);

  });

}


/*
 * At some point this workflow seems a little better for the sequential content sync
 */
/*
// Execute a list of Promise return functions in series
function pseries(list) {
  var p = Promise.resolve();
  return list.reduce(function(pacc, fn) {
    return pacc = pacc.then(fn);
  }, p);
}
// Promise returning functions to execute
function doFirstThing(){ return Promise.resolve(1); }
function doSecondThing(res){ return Promise.resolve(res + 1); }
function doThirdThing(res){ return Promise.resolve(res + 2); }
function lastThing(res){ console.log("result:", res); }

var fnlist = [ doFirstThing, doSecondThing, doThirdThing, lastThing];

pseries(fnlist);
*/
