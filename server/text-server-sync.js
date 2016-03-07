
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


if ( Meteor.isServer ) {
  Meteor.startup(function () {
    // Set interval to check and sync text content (currently 90 mins)
    // For development, just run it on startup
    //Meteor.setInterval(function() {
      console.log(" -- Sync with text server API started");

      // Removes for debugging
      //Languages.remove({})
      //Corpora.remove({})
      //Authors.remove({})
      //Works.remove({})
      //Texts.remove({})

      getLanguages()
        .then(function(response){
          let languages = response.data.languages;
          languages.forEach(function(language){
              let existing = Languages.find({slug:language}).fetch()

              if (!existing.length){
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

      Languages.find().fetch().forEach(function(language){
        getCorpora(language)
          .then(function(response){
            let corpora = response.data.corpora;
            corpora.forEach(function(corpus){
                let existing = Corpora.find({slug:corpus, language:language.slug}).fetch()

                if (!existing.length){
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

      Corpora.find().fetch().forEach(function(corpus){
        getAuthors(corpus)
          .then(function(response){
            let authors = response.data.authors;

            authors.forEach(function(author){
                let existing = Authors.find({slug:author}).fetch();

                if (!existing.length){
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

      Authors.find().fetch().forEach(function(author){
        getWorks(author)
          .then(function(response){
            let works = response.data.texts;
            works.forEach(function(work){
                let existing = Works.find({slug:work}).fetch()

                if (!existing.length){
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
            console.error(" -- -- error with syncing authors:", error);

          });

      });

      Works.find().fetch().forEach(function(work){
        getText(work)
          .then(function(response){
            let text_objs = response.data.text;
            let count = 0;

            for ( book_key in text_objs ){
              let existing = Texts.find({slug:work}).fetch()

              if (response.data.meta === "book-chapter-section"){
                for ( chapter_key in text_objs[book_key] ){
                  for ( section_key in text_objs[book_key][chapter_key] ){
                    var existing = Texts.find({
                        n : section_key,
                        chapter_n : chapter_key,
                        book_n : book_key,
                        author : work.author,
                        language : work.language,
                        corpus : work.corpus,
                        work : work.slug,
                      });

                    if (!existing.length){
                      Texts.insert({
                          n : section_key,
                          chapter : chapter_key,
                          book : book_key,
                          author : work.author,
                          language : work.language,
                          corpus : work.corpus,
                          work : work.slug,
                          text : text_objs[book_key][chapter_key][section_key],
                          html : text_objs[book_key][chapter_key][section_key],
                        });
                    }

                  }

                }

              }else if (response.data.meta === "book-line") {
                for ( line_key in text_objs[book_key] ){
                  var existing = Texts.find({
                      n : line_key,
                      book : book_key,
                      author : work.author,
                      language : work.language,
                      corpus : work.corpus,
                      work : work.slug,
                    });

                  if (!existing.length){
                    Texts.insert({
                        n : line_key,
                        book : book_key,
                        author : work.author,
                        language : work.language,
                        corpus : work.corpus,
                        work : work.slug,
                        text : text_objs[book_key][line_key],
                        html : text_objs[book_key][line_key]
                      });
                  }

                }


              }

              count++;

            }

            console.log(" -- -- synced", count, "text items" );

          }, function(error){
            console.error(" -- -- error with syncing authors:", error);

          });

      });


    //},540000);

  });

}


/*
 * At some point this workflow seems a little better
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
