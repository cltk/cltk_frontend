import Authors from '/imports/collections/authors';
import Works from '/imports/collections/works';

import cache from '/server/cache';

const CACHE_KEY = 'searchTools_cache_key'

Meteor.methods({
	searchTools() {
		const cachedResults = cache.get(CACHE_KEY);

		if (cachedResults) {
			return {
				...cachedResults,
				authors: Authors.find({ _id: { $in: cachedResults.authors } }).fetch()
			};
		}

		// NOTE: Works._collection.rawCollection() will only work on the server.
		// This is fine for now, because this file only runs on the server, but
		// there would need to be a workaround (or a `Meteor.isServer` check) if
		// the browser wanted to run this file.
		const languagesPromise = Works._collection.rawCollection().distinct('workLanguage', {
			workLanguage: { $nin: ['', null] }
		});
		const corporaPromise = Works._collection.rawCollection().distinct('corpus', {
			corpus: { $nin: ['', null] }
		});
		const worksAuthorsRaw = Works.find({ authors: { $exists: true } }, {
			sort: { 'authors.english_name': 1 },
			fields: { authors: true },
		}).map(doc => doc.authors[0]);

		return Promise.all([
			languagesPromise,
			corporaPromise
		]).then(([ languages, corpora ]) => {
			cache.set(CACHE_KEY, {
				...results,
				// `languages` and `corpora` are reasonably small, and
				// unlikely to grow dramatically, so it seems okay to
				// store them as is in the cache. Storing `authors`
				// wholesale, on the other hand, would dramatically
				// increase the size of the cached document, so just
				// store the `_id`s.
				authors: worksAuthorsRaw
			});

			const authorsRaw = Authors.find({ _id: { $in: worksAuthorsRaw } }).fetch();
			const authors = Array.from(new Set(authorsRaw));

			return {
				languages,
				corpora,
				authors,
			};
		}).catch(reason => {
			console.log(reason);
		});
	},

});
