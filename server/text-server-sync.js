/*
* Sync text content from the CLTK API for text from the JSON
*
*/
import pseries from 'pseries';

// TODO: Change the url to "api.cltk.org" once the updated api is deployed
const BASE_URL = 'http://localhost:5000';

// Utility function to clean word for definitions
function cleanWord(word, language) {
	let cleanedWord;
	switch (language) {
	// For latin, keep only latin alphabets
	case 'latin':
		cleanedWord = word.toLowerCase().replace(/[^a-z]/g, '');
		break;
	// TODO: Add word cleaning logic for other languages
	default:
		// do nothing
	}
	return cleanedWord;
}

function syncLanguages(languages) {
	languages.forEach(language => {
		const existing = Languages.findOne({ title: language });

		// Insert languages
		if (!existing) {
			try {
				Languages.insert({
					title: language,
				});
			} catch (err) {
				console.log('Error insert language');
				// console.error(err);
			}
		}
	});

	console.log(' -- -- synced', languages.length, 'languages');
}

function syncCorpora(corpora, language) {
	corpora.forEach(corpus => {
		const existing = Corpora.findOne({ title: corpus, language: language.title });

		// If corpus is not already in the database, insert it
		if (!existing) {
			try {
				Corpora.insert({
					title: corpus,
					language: language.title,
				});
			} catch (err) {
				console.log('Error insert corpora');
				// console.error(err);
			}
		}
	});
	console.log(' -- -- synced', corpora.length, 'corpora');
}

function syncAuthors(authors, corpus) {
	authors.forEach(author => {
		const existing = Authors.findOne({ title: author });

		// If the author is not in the datbase already, add it
		if (!existing) {
			try {
				Authors.insert({
					title: author,
					language: corpus.language,
					corpus: corpus.title,
				});
			} catch (err) {
				console.log('Error insert author');
				// console.error(err);
			}
		}
	});
	console.log(' -- -- synced', authors.length, 'authors');
}

function syncWorks(works, author) {
	works.forEach(work => {
		const existing = Works.findOne({ title: work });

		// If this work is not in the database yet, add it
		if (!existing) {
			try {
				Works.insert({
					title: work,
					author: author.title,
					language: author.language,
					corpus: author.corpus,
				});
			} catch (err) {
				console.log('Error insert works');
				// console.error(err);
			}
		}
	});
	console.log(' -- -- synced', works.length, 'works');
}

function syncTextNodes(textNodes, metaStructure, work) {
	let count = 0;

	/*
	* Save the meta structure on the work
	*/
	Works.update({ _id: work._id }, { $set: { structure: metaStructure } });

	/*
	* Parse the input document based on the document structure denoted in the
	* meta field
	*/
	if (['chapter', 'fragment', 'line'].indexOf(metaStructure) >= 0) {
		Object.keys(textNodes).forEach(n1Key => {
			//
			// Only adding the first 100 text chunks / objects makes debugging the sync script
			// and development easier
			//
			if (count < 100) {
				const existing = Texts.findOne({
					n_1: parseInt(n1Key, 10),
					author: work.author,
					language: work.language,
					corpus: work.corpus,
					work: work.title,
				});

				// If text object is not yet exiting in the database, add it
				if (!existing) {
					try {
						Texts.insert({
							n_1: parseInt(n1Key, 10),
							author: work.author,
							language: work.language,
							corpus: work.corpus,
							work: work.title,
							text: textNodes[n1Key],
							html: textNodes[n1Key],
						});
					} catch (err) {
						console.log('Error insert text');
						// console.error(err);
					}
				}

				count++;
			}
		}); // n_1
		console.log(' -- -- synced', count, 'text items');
	} else if (['poem-line', 'book-line', 'chapter-section', 'book-chapter', 'fragment-line']
		.indexOf(metaStructure) >= 0) {
		Object.keys(textNodes).forEach(n1Key => {
			Object.keys(textNodes[n1Key]).forEach(n2Key => {
				//
				// Only adding the first 100 text chunks / objects makes debugging the sync script
				// and development easier
				//
				if (count < 100) {
					const existing = Texts.findOne({
						n_1: parseInt(n1Key, 10),
						n_2: parseInt(n2Key, 10),
						author: work.author,
						language: work.language,
						corpus: work.corpus,
						work: work.title,
					});

					// If text object is not yet exiting in the database, add it
					if (!existing) {
						try {
							Texts.insert({
								n_1: parseInt(n1Key, 10),
								n_2: parseInt(n2Key, 10),
								author: work.author,
								language: work.language,
								corpus: work.corpus,
								work: work.title,
								text: textNodes[n1Key][n2Key],
								html: textNodes[n1Key][n2Key],
							});
						} catch (err) {
							console.log('Error insert text');
							// console.error(err);
						}
					}

					count++;
				}
			}); // n_2
		}); // n_1
		console.log(' -- -- synced', count, 'text items');
	} else if (['book-chapter-section'].indexOf(metaStructure) >= 0) {
		Object.keys(textNodes).forEach(n1Key => {
			Object.keys(textNodes[n1Key]).forEach(n2Key => {
				Object.keys(textNodes[n2Key]).forEach(n3Key => {
					//
					// Only adding the first 100 text chunks / objects makes debugging the sync script
					// and development easier!
					//
					if (count < 100) {
						const existing = Texts.findOne({
							n_1: parseInt(n1Key, 10),
							n_2: parseInt(n2Key, 10),
							n_3: parseInt(n3Key, 10),
							author: work.author,
							language: work.language,
							corpus: work.corpus,
							work: work.title,
						});

						// If text object is not yet exiting in the database, add it
						if (!existing) {
							try {
								Texts.insert({
									n_1: parseInt(n1Key, 10),
									n_2: parseInt(n2Key, 10),
									n_3: parseInt(n3Key, 10),
									author: work.author,
									language: work.language,
									corpus: work.corpus,
									work: work.title,
									text: textNodes[n1Key][n2Key][n3Key],
									html: textNodes[n1Key][n2Key][n3Key],
								});
							} catch (err) {
								console.log('Error insert text');
								// console.error(err);
							}
						}

						count++;
					}
				}); // n_3
			}); // n_2
		}); // n_1

		console.log(' -- -- synced', count, 'text items');
	} else {
		// Provide information about an unregonized document structure
		console.error(' -- -- unregonized document structure for work', work);
	}
}

function syncTranslations(translations, metaStructure, work) {
	/*
	* Parse the input document based on the document structure denoted in the
	* meta field
	*/
	translations.forEach((translation) => {
		let count = 0;
		if (['chapter', 'fragment', 'line'].indexOf(metaStructure) >= 0) {
			Object.keys(translation.text).forEach(n1Key => {
				//
				// Only adding the first 100 translation chunks / objects makes debugging the sync script
				// and development easier
				//
				if (count < 100) {
					const existing = Translations.findOne({
						n_1: parseInt(n1Key, 10),
						author: work.author,
						language: work.language,
						corpus: work.corpus,
						work: work.title,
						translator: translation.translator,
					});

					// If translation object is not yet exiting in the database, add it
					if (!existing) {
						try {
							Translations.insert({
								n_1: parseInt(n1Key, 10),
								author: work.author,
								language: work.language,
								corpus: work.corpus,
								work: work.title,
								translator: translation.translator,
								text: translation.text[n1Key],
								html: translation.text[n1Key],
							});
						} catch (err) {
							console.log('Error insert translation');
							// console.error(err);
						}
					}

					count++;
				}
			}); // n_1
			console.log(' -- -- synced', count, 'translation items');
		} else if (['poem-line', 'book-line', 'chapter-section', 'book-chapter', 'fragment-line']
			.indexOf(metaStructure) >= 0) {
			Object.keys(translation.text).forEach(n1Key => {
				Object.keys(translation.text[n1Key]).forEach(n2Key => {
					//
					// Only adding the first 100 translation chunks / objects makes debugging the sync script
					// and development easier
					//
					if (count < 100) {
						const existing = Translations.findOne({
							n_1: parseInt(n1Key, 10),
							n_2: parseInt(n2Key, 10),
							author: work.author,
							language: work.language,
							corpus: work.corpus,
							work: work.title,
							translator: translation.translator,

						});

						// If translation object is not yet exiting in the database, add it
						if (!existing) {
							try {
								Translations.insert({
									n_1: parseInt(n1Key, 10),
									n_2: parseInt(n2Key, 10),
									author: work.author,
									language: work.language,
									corpus: work.corpus,
									work: work.title,
									translator: translation.translator,
									text: translation.text[n1Key][n2Key],
									html: translation.text[n1Key][n2Key],
								});
							} catch (err) {
								console.log('Error insert translation');
								// console.error(err);
							}
						}

						count++;
					}
				}); // n_2
			}); // n_1
			console.log(' -- -- synced', count, 'translation items');
		} else if (['book-chapter-section'].indexOf(metaStructure) >= 0) {
			Object.keys(translation.text).forEach(n1Key => {
				Object.keys(translation.text[n1Key]).forEach(n2Key => {
					Object.keys(translation.text[n2Key]).forEach(n3Key => {
						//
						// Only adding the first 100 translation chunks /
						// objects makes debugging the sync script
						// and development easier!
						//
						if (count < 100) {
							const existing = Translations.findOne({
								n_1: parseInt(n1Key, 10),
								n_2: parseInt(n2Key, 10),
								n_3: parseInt(n3Key, 10),
								author: work.author,
								language: work.language,
								corpus: work.corpus,
								work: work.title,
								translator: translation.translator,
							});

							// If translation object is not yet exiting in the database, add it
							if (!existing) {
								try {
									Translations.insert({
										n_1: parseInt(n1Key, 10),
										n_2: parseInt(n2Key, 10),
										n_3: parseInt(n3Key, 10),
										author: work.author,
										language: work.language,
										corpus: work.corpus,
										work: work.title,
										translator: translation.translator,
										text: translation.text[n1Key][n2Key][n3Key],
										html: translation.text[n1Key][n2Key][n3Key],
									});
									count++;
								} catch (err) {
									console.log('Error insert translation');
									// console.error(err);
								}
							}

							count++;
						}
					}); // n_3
				}); // n_2
			}); // n_1

			console.log(' -- -- synced', count, 'translation items');
		} else {
			// Provide information about an unregonized document structure
			console.error(' -- -- unregonized document structure for work', work);
		}
	});
}

function syncDefinitions(word, text, definitions) {
	definitions.forEach(item => {
		const existing = Definitions.findOne({ headword: item.headword });
		let definitionId = '';
		if (!existing) {
			try {
				definitionId = Definitions.insert({
					headword: item.headword,
					pos: item.pos,
					definition: item.definition,
				});
			} catch (err) {
				console.log('Error insert definitions');
				// console.error(err);
			}
		} else {
			definitionId = existing._id;
		}
		try {
			Wordforms.insert({
				word,
				definitions: definitionId,
				texts: text._id,
			});
		} catch (err) {
			console.log('Error insert wordforms');
			// console.error(err);
		}
	});
	console.log(' -- -- synced', definitions.length,
		'definition items', 'for', word, 'in', text.work);
}

// Utility function to insert commentary
function insertCommentary(author, year, comment, ref, work) {
	let commentId = '';
	const existing = Commentary.findOne({
		author,
		year,
		ref,
		work,
	});
	if (!existing) {
		try {
			commentId = Commentary.insert({
				author,
				year,
				ref,
				content: comment,
				work,
			});
		} catch (err) {
			console.log('Error insert commentary');
			// console.error(err);
		}
	} else {
		commentId = existing._id;
	}
	return commentId;
}

function syncCommentary(commentaries, metaStructure, work) {
	if (['chapter', 'fragment', 'line'].indexOf(metaStructure) >= 0) {
		commentaries.forEach((commentary) => {
			let count = 0;
			commentary.comments.forEach((comment) => {
				const ref = `${comment.start.n_1}-${comment.end.n_1}`;
				const commentId =
					insertCommentary(commentary.author, commentary.year, comment.content, ref, work.title);
				count++;
				try {
					Texts.update(
						{
							n_1: { $gte: parseInt(comment.start.n_1, 10), $lte: parseInt(comment.end.n_1, 10) },
							work: work.title,
						},
						{ $addToSet: { comments: commentId } }, { multi: true }
					);
				} catch (err) {
					console.log('Error update texts comments');
					// console.error(err);
				}
			});
			console.log(' -- -- synced', count, 'commentary items');
		});
	} else if (['poem-line', 'book-line', 'chapter-section', 'book-chapter', 'fragment-line']
		.indexOf(metaStructure) >= 0) {
		commentaries.forEach((commentary) => {
			let count = 0;
			commentary.comments.forEach((comment) => {
				const ref =
					`${comment.start.n_1}.${comment.start.n_2}-${comment.end.n_1}.${comment.end.n_2}`;
				const commentId =
					insertCommentary(commentary.author, commentary.year, comment.content, ref, work.title);
				count++;
				try {
					Texts.update(
						{
							n_1: { $gte: parseInt(comment.start.n_1, 10), $lte: parseInt(comment.end.n_1, 10) },
							n_2: { $gte: parseInt(comment.start.n_2, 10), $lte: parseInt(comment.end.n_2, 10) },
							work: work.title,
						},
						{ $addToSet: { comments: commentId } }, { multi: true }
					);
				} catch (err) {
					console.log('Error update texts comments');
					// console.error(err);
				}
			});
			console.log(' -- -- synced', count, 'commentary items');
		});
	} else if (['book-chapter-section'].indexOf(metaStructure) >= 0) {
		commentaries.forEach((commentary) => {
			let count = 0;
			commentary.comments.forEach((comment) => {
				const ref = `${comment.start.n_1}.${comment.start.n_2}.${comment.start.n_3}-${
					comment.end.n_1}.${comment.end.n_2}.${comment.end.n_3}`;
				const commentId =
					insertCommentary(commentary.author, commentary.year, comment.content, ref, work.title);
				count++;
				try {
					Texts.update(
						{
							n_1: { $gte: parseInt(comment.start.n_1, 10), $lte: parseInt(comment.end.n_1, 10) },
							n_2: { $gte: parseInt(comment.start.n_2, 10), $lte: parseInt(comment.end.n_2, 10) },
							n_3: { $gte: parseInt(comment.start.n_3, 10), $lte: parseInt(comment.end.n_3, 10) },
							work: work.title,
						},
						{ $addToSet: { comments: commentId } }, { multi: true }
					);
				} catch (err) {
					console.log('Error update texts comments');
					// console.error(err);
				}
			});
			console.log(' -- -- synced', count, 'commentary items');
		});
	}
}

// Get the available languages from the API
function getLanguages() {
	return new Promise((resolve, reject) => {
		HTTP.get(`${BASE_URL}/lang`, {}, (error, response) => {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
}

// Get the corpora for each language
function getCorpora(language) {
	return new Promise((resolve, reject) => {
		HTTP.get(`${BASE_URL}/lang/${language.title}/corpus`, {}, (error, response) => {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
}

// Get the authors for each corpus
function getAuthors(corpus) {
	return new Promise((resolve, reject) => {
		HTTP.get(`${BASE_URL}/lang/${corpus.language}/corpus/${corpus.title}/author`,
			{}, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
	});
}

// Get the text list for each author
function getWorks(author) {
	return new Promise((resolve, reject) => {
		HTTP.get(
			`${BASE_URL}/lang/${author.language}/corpus/${author.corpus}/author/${author.title}/text`,
			{}, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
	});
}

// Get each invidual text in the text list
function getTextNodes(work) {
	return new Promise((resolve, reject) => {
		HTTP.get(
			`${BASE_URL}/lang/${work.language}/corpus/${work.corpus}/author/${
				work.author}/text/${work.title}`,
			{}, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
	});
}
// Get translation for each invidual text in the text list
function getTranslations(work, language) {
	return new Promise((resolve, reject) => {
		HTTP.get(`${BASE_URL}/lang/${work.language}/corpus/${work.corpus}/author/${
			work.author}/text/${work.title}`,
			{ params: { translation: language } }, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
	});
}

function getDefinitions(word, lang) {
	return new Promise((resolve, reject) => {
		HTTP.get(`${BASE_URL}/lang/${lang}/define/${word}`, {}, (error, response) => {
			if (error) {
				reject(error);
			} else {
				resolve(response);
			}
		});
	});
}

function getCommentary(work) {
	return new Promise((resolve, reject) => {
		HTTP.get(
			`${BASE_URL}/lang/${work.language}/corpus/${work.corpus}/author/${
				work.author}/text/${work.title}`,
			{ params: { commentary: 'all' } }, (error, response) => {
				if (error) {
					reject(error);
				} else {
					resolve(response);
				}
			});
	});
}

// Get all the available languages from the API synchronously
function getLanguagesSequence() {
	return new Promise((resolve) => {
		response = HTTP.get(`${BASE_URL}/lang`);

		if (response.statusCode === 200) {
			syncLanguages(response.data.languages);
		} else {
			console.error('Error with languages sync at', response);
		}

		resolve();
	});
}

// Get the corpora for all languages synchronously
function getCorporaSequence() {
	return new Promise((resolve) => {
		Languages.find().fetch().forEach(language => {
			response = HTTP.get(`${BASE_URL}/lang/${language.title}/corpus`);

			if (response.statusCode === 200) {
				syncCorpora(response.data.corpora, language);
			} else {
				console.error('Error with corpora sync at', response);
			}
		});

		resolve();
	});
}

// Get the authors for all corpora synchronously
function getAuthorsSequence() {
	return new Promise((resolve) => {
		Corpora.find().fetch().forEach(corpus => {
			response = HTTP.get(`${BASE_URL}/lang/${corpus.language}/corpus/${corpus.title}/author`);

			if (response.statusCode === 200) {
				syncAuthors(response.data.authors, corpus);
			} else {
				console.error('Error with authors sync at', response);
			}
		});

		resolve();
	});
}

// Get the text list for all authors synchronously
function getWorksSequence() {
	return new Promise((resolve) => {
		Authors.find().fetch().forEach(author => {
			response = HTTP.get(`${BASE_URL}/lang/${author.language}/corpus/${
				author.corpus}/author/${author.title}/text`);

			if (response.statusCode === 200) {
				syncWorks(response.data.texts, author);
			} else {
				console.error('Error with works sync at', response);
			}
		});

		resolve();
	});
}

// Get invidual text in all the text lists synchronously
function getTextNodesSequence() {
	return new Promise((resolve) => {
		Works.find().fetch().forEach(work => {
// For each work, fetch the document text from the API
			response = HTTP.get(`${BASE_URL}/lang/${work.language}/corpus/${
				work.corpus}/author/${work.author}/text/${work.title}`);


			if (response.statusCode === 200) {
				syncTextNodes(response.data.text, response.data.meta, work);
			} else {
				console.error('Error with text nodes sync at', response);
			}
		});

		resolve();
	});
}

// Get translations for texts synchronously
function getTranslationsSequence() {
	return new Promise((resolve) => {
		Works.find().fetch().forEach(work => {
			// For each work, fetch the translations from the API
			response = HTTP.get(`${BASE_URL}/lang/${work.language}/corpus/
				${work.corpus}/author/${work.author}/text/${work.title}`,
			{ params: { translation: 'english' } });

			if (response.statusCode === 200 && response.data != null) {
				syncTranslations(response.data.translations, response.data.meta, work);
			} else {
				console.error('Error with translations sync at', response);
			}
		});

		resolve();
	});
}
// Get commentary for texts synchronously
function getCommentarySequence() {
	return new Promise((resolve) => {
		Works.find().fetch().forEach(work => {
			// For each work, fetch the commentary from the API
			response = HTTP.get(`${BASE_URL}/lang/${work.language}/corpus/${
				work.corpus}/author/${work.author}/text/${work.title}`,
				{ params: { commentary: 'all' } });

			if (response.statusCode === 200 && response.data != null) {
				syncCommentary(response.data.commentary, response.data.meta, work);
			} else {
				console.error('Error with commentary sync at', response);
			}
		});

		resolve();
	});
}

// Get word definitions for text synchronously
function getDefinitionSequence() {
	return new Promise((resolve) => {
		Texts.find().fetch().forEach(text => {
			words = text.text.split(' ');
			words.forEach(word => {
				// Cleaning word
				cleanedWord = cleanWord(word, text.language);
				const existing = Wordforms.findOne({ cleanedWord, texts: text._id });

				if (!existing) {
					response = HTTP.get(`${BASE_URL}/lang/${text.language}/define/${cleanedWord}`);

					if (response.statusCode === 200) {
						syncDefinitions(cleanedWord, text, response.data);
					} else {
						console.error('Error with definitions sync at', response);
					}
				}
			});
		});

		resolve();
	});
}

// Removes all content synced from the API
function resetDb() {
	try {
		Languages.remove({});
		Corpora.remove({});
		Authors.remove({});
		Works.remove({});
		Texts.remove({});
		Definitions.remove({});
		Wordforms.remove({});
		Translations.remove({});
		Commentary.remove({});
	} catch (err) {
		console.log('Error reset db');
		// console.error(err);
	}
}

/*
* Sync content from the API with parallel requests to each level of the API
*/
function doSyncParallel() {
	// Get all languages manifest in the API
	getLanguages()
	.then(response => {
		syncLanguages(response.data.languages);
	}, error => {
		console.error(' -- -- error with syncing languages:', error);
	});

	// Get all corpora for each language in the manifest from the API
	Languages.find().fetch().forEach(language => {
		getCorpora(language)
		.then(response => {
			syncCorpora(response.data.corpora, language);
		}, error => {
			console.error(' -- -- error with syncing corpora:', error);
		});
	});

	// Get all authors for each corpus manifest in the API
	Corpora.find().fetch().forEach(corpus => {
		getAuthors(corpus)
		.then(response => {
			syncAuthors(response.data.authors);
		}, error => {
			console.error(' -- -- error with syncing authors:', error);
		});
	});

	// Get all works for each author manifest in the API
	Authors.find().fetch().forEach(author => {
		getWorks(author)
		.then(response => {
			syncWorks(response.data.texts, author);
		}, error => {
			console.error(' -- -- error with syncing works:', error);
		});
	});

	// Get the document text for each work manifest in the API
	Works.find().fetch().forEach(work => {
	// For each work, fetch the document text from the API
		getTextNodes(work)
		.then(response => {
			syncTextNodes(response.data.text, response.data.meta, work);
		}, error => {
		// Do better error handling here in the future
			console.error(' -- -- error with syncing text items:', error);
		});
	});

	// Get the translations for document texts
	Works.find().fetch().forEach(work => {
	// For each work, fetch the translations from the API
		getTranslations(work, 'english')
		.then(response => {
		// We might not have transaltions for all works
			if (response.data != null) {
				syncTranslations(response.data.translations, response.data.meta, work);
			}
		}, error => {
		// Do better error handling here in the future
			console.error(' -- -- error with syncing translations:', error);
		});
	});

	// Get commentary for document texts
	Works.find().fetch().forEach(work => {
		// For each work, fetch the commentary from the API
		getCommentary(work)
		.then(response => {
			// We might not have commentary for all works
			if (response.data != null) {
				syncCommentary(response.data.commentary, response.data.meta, work);
			}
		}, error => {
			// Do better error handling here in the future
			console.error(' -- -- error with syncing commentary:', error);
		});
	});

	// Get the definitions for each word in the texts
	Texts.find().fetch().forEach(text => {
		words = text.text.split(' ');
		words.forEach(word => {
			// Cleaning word
			cleanedWord = cleanWord(word, text.language);
			const existing = Wordforms.findOne({ cleanedWord, texts: text._id });
			if (!existing) {
				getDefinitions(cleanedWord, text.language)
				.then(response => {
					syncDefinitions(cleanedWord, text, response.data);
				}, error => {
					// Do better error handling here in the future
					console.error(' -- -- error with syncing definitions:', error);
				});
			}
		});
	});
}


/*
* Sync content from the API with sequential requests
*/
function doSyncSequence() {
// Promise returning functions to execute
	pseries([getLanguagesSequence, getCorporaSequence, getAuthorsSequence,
	getWorksSequence, getTextNodesSequence, getTranslationsSequence,
	getCommentarySequence, getDefinitionSequence]);
}


/*
* If is server, perform sync operations
*/
if (Meteor.isServer) {
	// Start sync on application startup
	Meteor.startup(() => {
		// If necessary for development purposes, reset and re-sync database
		// resetDb();

		// If no languages have been synced from the CLTK API, then assume that no
		// content is in the database and sync content sequentially, languages to texts
		if (!Languages.find({}, { limit: 1 }).fetch().length ||
			!Definitions.find({}, { limit: 1 }).fetch().length) {
			const date = new Date();
			console.log(' -- Initial sequence sync with text server API started at', date.toString());
			// doSyncSequence();
		}

		/*
		* Set interval to check and sync text content (currently 90 mins)
		*/
		Meteor.setInterval(() => {
			// Sync content from the text server with parallel requests to the API
			// const date = new Date();
			// console.log(' -- Interval sync with text server API started at', date.toString());
			// doSyncParallel();
		}, 540000);
	});
}
/* eslint no-unused-vars: "off" */
