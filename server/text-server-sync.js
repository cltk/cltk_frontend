/*
 * Sync text content from the CLTK API for text from the JSON
 *
 */
import pseries from 'pseries';

// TODO: Change the url to "api.cltk.org" once the updated api is deployed
let BASE_URL  = "http://localhost:5000"

//Utility function to clean word for definitions
function cleanWord(word, language) {
  switch(language) {
    // For latin, keep only latin alphabets
    case "latin":
      word = word.toLowerCase().replace(/[^a-z]/g,"");
      break;
    //TODO: Add word cleaning logic for other languages
  }
  return word;
}

// Get the available languages from the API
function getLanguages(){
  return new Promise(function(resolve, reject){
    HTTP.get(BASE_URL + "/lang", {}, function(error, response){
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
    HTTP.get(BASE_URL + "/lang/" + language.slug + "/corpus", {}, function(error, response){
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
    HTTP.get(BASE_URL + "/lang/" + corpus.language + "/corpus/" + corpus.slug + "/author", {}, function(error, response){
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
    HTTP.get(BASE_URL + "/lang/" + author.language + "/corpus/" + author.corpus + "/author/" + author.slug + "/text", {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

// Get each invidual text in the text list
function getTextNodes(work){
  return new Promise(function(resolve, reject){
    HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug, {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}
// Get translation for each invidual text in the text list
function getTranslations(work, language){
  return new Promise(function(resolve, reject){
    HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug,
      {params: {translation: language}},
      function(error, response){
        if (error){
          reject(error);
        }else {
          resolve(response);
        }
      }
    );

  });

}

function getDefinitions(word, lang){
   return new Promise(function(resolve, reject){
    HTTP.get(BASE_URL + "/lang/" + lang + "/define/" + word, {}, function(error, response){
      if (error){
        reject(error);
      }else {
        resolve(response);
      }
    });

  });

}

function getCommentary(work){
  return new Promise(function(resolve, reject){
    HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug,
      {params: {commentary: "all"}},
      function(error, response){
        if (error){
          reject(error);
        }else {
          resolve(response);
        }
      }
    );
  });
}

// Get all the available languages from the API synchronously
function getLanguagesSequence(){

  return new Promise(function(resolve, reject){
    response = HTTP.get(BASE_URL + "/lang")

    if(response.statusCode === 200){ syncLanguages(response.data.languages);

    }else{
      console.error("Error with languages sync at", response);

    }

    resolve();


  });

}

// Get the corpora for all languages synchronously
function getCorporaSequence(res){

  return new Promise(function(resolve, reject){
    Languages.find().fetch().forEach(function(language){
      response = HTTP.get(BASE_URL + "/lang/" + language.slug + "/corpus")

      if(response.statusCode === 200){
        syncCorpora(response.data.corpora, language);
      }else{
        console.error("Error with corpora sync at", response);
      }

    });

    resolve();


  });

}

// Get the authors for all corpora synchronously
function getAuthorsSequence(res){

  return new Promise(function(resolve, reject){
    Corpora.find().fetch().forEach(function(corpus){
      response = HTTP.get(BASE_URL + "/lang/" + corpus.language + "/corpus/" + corpus.slug + "/author")

      if(response.statusCode === 200){
        syncAuthors(response.data.authors, corpus);

      }else{
        console.error("Error with authors sync at", response);

      }


    });

    resolve();

  });


}

// Get the text list for all authors synchronously
function getWorksSequence(res){

  return new Promise(function(resolve, reject){
    Authors.find().fetch().forEach(function(author){

      response = HTTP.get(BASE_URL + "/lang/" + author.language + "/corpus/" + author.corpus + "/author/" + author.slug + "/text")

      if(response.statusCode === 200){
        syncWorks(response.data.texts, author);

      }else{
        console.error("Error with works sync at", response);

      }


    });

    resolve();


  });

}

// Get invidual text in all the text lists synchronously
function getTextNodesSequence(res){

  return new Promise(function(resolve, reject){
    Works.find().fetch().forEach(function(work){

      // For each work, fetch the document text from the API
      response = HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug);


      if(response.statusCode === 200){
        syncTextNodes(response.data.text, response.data.meta, work);

      }else{
        console.error("Error with text nodes sync at", response);

      }


    });

    resolve();


  });

}

// Get translations for texts synchronously
function getTranslationsSequence(res) {
  return new Promise(function(resolve, reject){

    Works.find().fetch().forEach(function(work){

      // For each work, fetch the translations from the API
      response = HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug,
                  {params: {translation: "english"}});

      if(response.statusCode === 200 && response.data != null){
        syncTranslations(response.data.translations, response.data.meta, work);
      }
      else{
      }

    });

    resolve();

  });

}
// Get commentary for texts synchronously
function getCommentarySequence(res) {
  return new Promise(function(resolve, reject){

    Works.find().fetch().forEach(function(work){

      // For each work, fetch the commentary from the API
      response = HTTP.get(BASE_URL + "/lang/" + work.language + "/corpus/" + work.corpus + "/author/" + work.author + "/text/" + work.slug,
                  {params: {commentary: "all"}});

      if(response.statusCode === 200 && response.data != null){
        syncCommentary(response.data.commentary, response.data.meta, work);
      }
      else{
      }

    });

    resolve();

  });

}

// Get word definitions for text synchronously
function getDefinitionSequence(res){
  return new Promise(function(resolve, reject){

    Texts.find().fetch().forEach(function(text){
      words = text.text.split(" ");
      words.forEach(function(word){

        // Cleaning word
        word = cleanWord(word, text.language);
        let existing = Wordforms.findOne({word: word});

        if(!existing){

          response = HTTP.get(BASE_URL + "/lang/" + text.language + "/define/" + word);

          if(response.statusCode === 200){
            syncDefinitions(word, text, response.data);

          }else{
            console.error("Error with definitions sync at", response);

          }

        }

      });

    });

    resolve();

  });
}

// Removes all content synced from the API
function resetDb(){
  try{
    Languages.remove({});
    Corpora.remove({});
    Authors.remove({});
    Works.remove({});
    Texts.remove({});
    Definitions.remove({});
    Wordforms.remove({});
    Translations.remove({});
    Commentary.remove({});
  }
  catch(err){
    console.log("Error reset db");
    //console.error(err);
  }

}

function syncLanguages(languages){

  languages.forEach(function(language){
      let existing = Languages.findOne({slug:language});

      // Insert languages
      if (!existing){
        try{
          Languages.insert({
              title : language,
              slug : language
            }
          );
        }
        catch(err){
          console.log("Error insert language");
          //console.error(err);
        }
      }

    });

  console.log(" -- -- synced", languages.length, "languages");
}

function syncCorpora(corpora, language){
  corpora.forEach(function(corpus){
      let existing = Corpora.findOne({slug:corpus, language:language.slug});

      // If corpus is not already in the database, insert it
      if (!existing){
        try{
          Corpora.insert({
              title : corpus,
              language : language.slug,
              slug : corpus
            }
          );
        }
        catch(err){
          console.log("Error insert corpora");
          //console.error(err);
        }
      }

    });
  console.log(" -- -- synced", corpora.length, "corpora");

}

function syncAuthors(authors, corpus){

  authors.forEach(function(author){
      let existing = Authors.findOne({slug:author});

      // If the author is not in the datbase already, add it
      if (!existing){
        try{
          Authors.insert({
              title : author,
              slug : author,
              language : corpus.language,
              corpus : corpus.slug
            }
          );
        }
        catch(err){
          console.log("Error insert author");
          //console.error(err);
        }
      }

    });
  console.log(" -- -- synced", authors.length, "authors");

}

function syncWorks(works, author){
  works.forEach(function(work){
      let existing = Works.findOne({slug:work});

      // If this work is not in the database yet, add it
      if (!existing){
        try{
          Works.insert({
              title : work,
              slug : work,
              author : author.slug,
              language : author.language,
              corpus : author.corpus
            }
          );
        }
        catch(err){
          console.log("Error insert works");
          //console.error(err);
        }
      }

    });
  console.log(" -- -- synced", works.length, "works");

}

function syncTextNodes(textNodes, metaStructure, work){
  let count = 0;

  /*
   * Save the meta structure on the work
   */
  Works.update({_id:work._id},{$set: {structure: metaStructure}});

  /*
   * Parse the input document based on the document structure denoted in the
   * meta field
   */
  if (["chapter", "fragment", "line"].indexOf(metaStructure) >= 0){
    for (let n_1_key in textNodes ){
      //
      // Only adding the first 100 text chunks / objects makes debugging the sync script
      // and development easier
      //
      if (count < 100){

        let existing = Texts.findOne({
            n_1 : parseInt(n_1_key),
            author : work.author,
            language : work.language,
            corpus : work.corpus,
            work : work.slug,
          });

        // If text object is not yet exiting in the database, add it
        if (!existing){
          try{
            Texts.insert({
                n_1 : parseInt(n_1_key),
                author : work.author,
                language : work.language,
                corpus : work.corpus,
                work : work.slug,
                text : textNodes[n_1_key],
                html : textNodes[n_1_key],
              }
            );
          }
          catch(err){
            console.log("Error insert text");
            //console.error(err);
          }
        }

        count++;
      }

    } // n_1
    console.log(" -- -- synced", count, "text items" );

  }else if (["poem-line", "book-line", "chapter-section", "book-chapter", "fragment-line"].indexOf(metaStructure) >= 0) {
    for (let n_1_key in textNodes ){
      for (let n_2_key in textNodes[n_1_key] ){
        //
        // Only adding the first 100 text chunks / objects makes debugging the sync script
        // and development easier
        //
        if (count < 100){
          let existing = Texts.findOne({
              n_1 : parseInt(n_1_key),
              n_2 : parseInt(n_2_key),
              author : work.author,
              language : work.language,
              corpus : work.corpus,
              work : work.slug,
            });

          // If text object is not yet exiting in the database, add it
          if (!existing){
            try{
              Texts.insert({
                n_1 : parseInt(n_1_key),
                n_2 : parseInt(n_2_key),
                author : work.author,
                language : work.language,
                corpus : work.corpus,
                work : work.slug,
                text : textNodes[n_1_key][n_2_key],
                html : textNodes[n_1_key][n_2_key],
              });
            }
            catch(err){
              console.log("Error insert text");
              //console.error(err);
            }

          }

          count++;
        }

      } // n_2
    } // n_1
    console.log(" -- -- synced", count, "text items" );

  }else if (["book-chapter-section"].indexOf(metaStructure) >= 0){
    for (let n_1_key in textNodes ){
      for (let n_2_key in textNodes[n_1_key] ){
        for (let n_3_key in textNodes[n_2_key] ){
          //
          // Only adding the first 100 text chunks / objects makes debugging the sync script
          // and development easier!
          //
          if (count < 100){
            let existing = Texts.findOne({
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
              try{
                Texts.insert({
                    n_1 : parseInt(n_1_key),
                    n_2 : parseInt(n_2_key),
                    n_3 : parseInt(n_3_key),
                    author : work.author,
                    language : work.language,
                    corpus : work.corpus,
                    work : work.slug,
                    text : textNodes[n_1_key][n_2_key][n_3_key],
                    html : textNodes[n_1_key][n_2_key][n_3_key],
                  }
                );
              }
              catch(err){
                console.log("Error insert text");
                //console.error(err);
              }
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

}

function syncTranslations(translations, metaStructure, work){
  /*
   * Parse the input document based on the document structure denoted in the
   * meta field
   */
  translations.forEach((translation) => {
    let count  = 0;
    if (["chapter", "fragment", "line"].indexOf(metaStructure) >= 0){
      for (let n_1_key in translation.text ){
        //
        // Only adding the first 100 translation chunks / objects makes debugging the sync script
        // and development easier
        //
        if (count < 100){

          let existing = Translations.findOne({
              n_1 : parseInt(n_1_key),
              author : work.author,
              language : work.language,
              corpus : work.corpus,
              work : work.slug,
              translator: translation.translator
            });

          // If translation object is not yet exiting in the database, add it
          if (!existing){
            try{
              Translations.insert({
                  n_1 : parseInt(n_1_key),
                  author : work.author,
                  language : work.language,
                  corpus : work.corpus,
                  work : work.slug,
                  translator: translation.translator,
                  text : translation.text[n_1_key],
                  html : translation.text[n_1_key],
                }
              );
            }
            catch(err){
              console.log("Error insert translation");
              //console.error(err);
            }
          }

          count++;
        }

      } // n_1
      console.log(" -- -- synced", count, "translation items" );

    }else if (["poem-line", "book-line", "chapter-section", "book-chapter", "fragment-line"].indexOf(metaStructure) >= 0) {
      for (let n_1_key in translation.text ){
        for (let n_2_key in translation.text[n_1_key] ){
          //
          // Only adding the first 100 translation chunks / objects makes debugging the sync script
          // and development easier
          //
          if (count < 100){
            let existing = Translations.findOne({
                n_1 : parseInt(n_1_key),
                n_2 : parseInt(n_2_key),
                author : work.author,
                language : work.language,
                corpus : work.corpus,
                work : work.slug,
                translator: translation.translator

              });

            // If translation object is not yet exiting in the database, add it
            if (!existing){
              try{
                Translations.insert({
                  n_1 : parseInt(n_1_key),
                  n_2 : parseInt(n_2_key),
                  author : work.author,
                  language : work.language,
                  corpus : work.corpus,
                  work : work.slug,
                  translator: translation.translator,
                  text : translation.text[n_1_key][n_2_key],
                  html : translation.text[n_1_key][n_2_key],
                });
              }
              catch(err){
                console.log("Error insert translation");
                //console.error(err);
              }
            }

            count++;
          }

        } // n_2
      } // n_1
      console.log(" -- -- synced", count, "translation items" );

    }else if (["book-chapter-section"].indexOf(metaStructure) >= 0){
      for (let n_1_key in translation.text ){
        for (let n_2_key in translation.text[n_1_key] ){
          for (let n_3_key in translation.text[n_2_key] ){
            //
            // Only adding the first 100 translation chunks / objects makes debugging the sync script
            // and development easier!
            //
            if (count < 100){
              let existing = Translations.findOne({
                  n_1 : parseInt(n_1_key),
                  n_2 : parseInt(n_2_key),
                  n_3 : parseInt(n_3_key),
                  author : work.author,
                  language : work.language,
                  corpus : work.corpus,
                  work : work.slug,
                  translator: translation.translator
                });

              // If translation object is not yet exiting in the database, add it
              if (!existing){
                try{
                  Translations.insert({
                      n_1 : parseInt(n_1_key),
                      n_2 : parseInt(n_2_key),
                      n_3 : parseInt(n_3_key),
                      author : work.author,
                      language : work.language,
                      corpus : work.corpus,
                      work : work.slug,
                      translator: translation.translator,
                      text : translation.text[n_1_key][n_2_key][n_3_key],
                      html : translation.text[n_1_key][n_2_key][n_3_key],
                    }
                  );
                  count++;
                }
                catch(err){
                  console.log("Error insert translation");
                  //console.error(err);
                }
              }

              count++;
            }

          } // n_3
        } // n_2
      } // n_1

      console.log(" -- -- synced", count, "translation items" );

    }else {
      // Provide information about an unregonized document structure
      console.error(" -- -- unregonized document structure for work", work);

    }
  });

}

function syncDefinitions(word, text, definitions){
  definitions.forEach(function(item){
    let existing = Definitions.findOne({headword: item.headword});
    let definition_id = "";
    if(!existing){
      try{
        definition_id = Definitions.insert({
            headword: item.headword,
            pos: item.pos,
            definition: item.definition,
          }
        );
      }
      catch(err){
        console.log("Error insert definitions");
        //console.error(err);
      }

    }else{
      definition_id = existing._id;
    }
    try{
      Wordforms.insert({
          word: word,
          definitions: definition_id,
          texts: text._id,
        }
      );
    }
    catch(err){
      console.log("Error insert wordforms");
      //console.error(err);
    }

  });
  console.log(" -- -- synced", definitions.length, "definition items", "for", word, "in", text.work);
}

// Utility function to insert commentary
function insertCommentary(author, year, comment, ref) {
  let comment_id = "";
  let existing = Commentary.findOne({
    author: author,
    year: year,
    ref: ref
  });
  if(!existing){
    try {
      comment_id = Commentary.insert({
        author: author,
        year: year,
        ref: ref,
        content: comment
      });
    }
    catch(err){
      console.log("Error insert commentary");
    }
  }
  else {
    comment_id = existing._id;
  }
  return comment_id;
}

function syncCommentary(commentaries, metaStructure, work) {
  if (["chapter", "fragment", "line"].indexOf(metaStructure) >= 0) {

    commentaries.forEach((commentary) => {
      let count = 0;
      commentary.comments.forEach((comment) => {
        let ref = comment.start.n_1 + "-" + comment.end.n_1;
        let comment_id = insertCommentary(commentary.author, commentary.year, comment.content, ref);
        count++;
        try {
          Texts.update(
            {
              n_1: {$gte: parseInt(comment.start.n_1), $lte: parseInt(comment.end.n_1)},
              work: work.slug
            },
            {$addToSet: {comments: comment_id}}, {multi: true}
          );
        }
        catch(err){
          console.log("Error update texts comments");
          //console.error(err);
        }
      });
      console.log(" -- -- synced", count, "commentary items");
    });

  }else if (["poem-line", "book-line", "chapter-section", "book-chapter", "fragment-line"].indexOf(metaStructure) >= 0) {
     commentaries.forEach((commentary) => {
      let count = 0;
      commentary.comments.forEach((comment) => {
        let ref = comment.start.n_1 + "." + comment.start.n_2 + "-"
                  + comment.end.n_1 + "." + comment.end.n_2;
        let comment_id = insertCommentary(commentary.author, commentary.year, comment.content, ref);
        count++;
        try {
          Texts.update(
            {
              n_1: {$gte: parseInt(comment.start.n_1), $lte: parseInt(comment.end.n_1)},
              n_2: {$gte: parseInt(comment.start.n_2), $lte: parseInt(comment.end.n_2)},
              work: work.slug
            },
            {$addToSet: {comments: comment_id}}, {multi: true}
          );
        }
        catch(err){
          console.log("Error update texts comments");
          //console.error(err);
        }
      });
      console.log(" -- -- synced", count, "commentary items");
    });
  }else if (["book-chapter-section"].indexOf(metaStructure) >= 0){
    commentaries.forEach((commentary) => {
      let count = 0;
      commentary.comments.forEach((comment) => {
        let ref = comment.start.n_1 + "." + comment.start.n_2 + "." + comment.start.n_3  + "-"
                  + comment.end.n_1 + "." + comment.end.n_2 + "." + comment.end.n_3;
        let comment_id = insertCommentary(commentary.author, commentary.year, comment.content, ref);
        count++;
        try {
          Texts.update(
            {
              n_1: {$gte: parseInt(comment.start.n_1), $lte: parseInt(comment.end.n_1)},
              n_2: {$gte: parseInt(comment.start.n_2), $lte: parseInt(comment.end.n_2)},
              n_3: {$gte: parseInt(comment.start.n_3), $lte: parseInt(comment.end.n_3)},
              work: work.slug
            },
            {$addToSet: {comments: comment_id}}, {multi: true}
          );
        }
        catch(err){
          console.log("Error update texts comments");
          //console.error(err);
        }
      });
      console.log(" -- -- synced", count, "commentary items");
    });
  }
}

/*
 * Sync content from the API with parallel requests to each level of the API
 */
function doSyncParallel(){

  // Get all languages manifest in the API
  getLanguages()
    .then(function(response){
      syncLanguages(response.data.languages);

    }, function(error){
      console.error(" -- -- error with syncing languages:", error);

    });

  // Get all corpora for each language in the manifest from the API
  Languages.find().fetch().forEach(function(language){
    getCorpora(language)
      .then(function(response){
        syncCorpora(response.data.corpora, language);

      }, function(error){
        console.error(" -- -- error with syncing corpora:", error);

      });

  });

  // Get all authors for each corpus manifest in the API
  Corpora.find().fetch().forEach(function(corpus){
    getAuthors(corpus)
      .then(function(response){
        syncAuthors(response.data.authors);

      }, function(error){
        console.error(" -- -- error with syncing authors:", error);

      });

  });

  // Get all works for each author manifest in the API
  Authors.find().fetch().forEach(function(author){
    getWorks(author)
      .then(function(response){
        syncWorks(response.data.texts, author);

      }, function(error){
        console.error(" -- -- error with syncing works:", error);

      });

  });

  // Get the document text for each work manifest in the API
  Works.find().fetch().forEach(function(work){
    // For each work, fetch the document text from the API
    getTextNodes(work)
      .then(function(response){
        syncTextNodes(response.data.text, response.data.meta, work);

      }, function(error){
        // Do better error handling here in the future
        console.error(" -- -- error with syncing text items:", error);

      });

  });

  // Get the translations for document texts
  Works.find().fetch().forEach(function(work){
    // For each work, fetch the translations from the API
    getTranslations(work, "english")
    .then(function(response){
      // We might not have transaltions for all works
      if(response.data != null) {
        syncTranslations(response.data.translations, response.data.meta, work);
      }

    }, function(error){
      // Do better error handling here in the future
      console.error(" -- -- error with syncing translations:", error);

    });

  });

  // Get commentary for document texts
  Works.find().fetch().forEach(function(work){
    // For each work, fetch the commentary from the API
    getCommentary(work)
    .then(function(response){
      // We might not have commentary for all works
      if(response.data != null) {
        syncCommentary(response.data.commentary, response.data.meta, work);
      }

    }, function(error){
      // Do better error handling here in the future
      console.error(" -- -- error with syncing commentary:", error);

    });

  });

  // Get the definitions for each word in the texts
  Texts.find().fetch().forEach(function(text){
    words = text.text.split(" ");
    words.forEach(function(word){
      // Cleaning word
      word = cleanWord(word, text.language);
      let existing = Wordforms.findOne({word: word});
      if(!existing){
        getDefinitions(word, text.language)
        .then(function(response){
          syncDefinitions(word, text, response.data);
        }, function(error){
          // Do better error handling here in the future
          console.error(" -- -- error with syncing definitions:", error);
        });
      }
    });
  });

}


/*
 * Sync content from the API with sequential requests
 */
function doSyncSequence(){
  // Promise returning functions to execute
  pseries([getLanguagesSequence, getCorporaSequence, getAuthorsSequence, getWorksSequence, getTextNodesSequence,
    getTranslationsSequence, getCommentarySequence, getDefinitionSequence]);

}


/*
 * If is server, perform sync operations
 */
if ( Meteor.isServer ) {
  // Start sync on application startup
  Meteor.startup(function () {

    // If necessary for development purposes, reset and re-sync database
    //resetDb();

    // If no languages have been synced from the CLTK API, then assume that no
    // content is in the database and sync content sequentially, languages to texts
    if( !Languages.find({}, {limit: 1}).fetch().length || !Definitions.find({}, {limit: 1}).fetch().length ){
      let date = new Date();
      console.log(" -- Initial sequence sync with text server API started at", date.toString());
      doSyncSequence();
    }

    /*
     * Set interval to check and sync text content (currently 90 mins)
     */
    Meteor.setInterval(function() {

      // Sync content from the text server with parallel requests to the API
      let date = new Date();
      console.log(" -- Interval sync with text server API started at", date.toString());
      doSyncParallel();

    },540000);

  });

}
