import Authors from '/imports/collections/authors';
import Works from '/imports/collections/works';

import cache from '/server/cache';

const CACHE_KEY = 'searchTools_cache_key'

function getDistinctFieldInWorks(field) {
	// NOTE: Works._collection.rawCollection() will only work on the server.
	// This is fine for now, because this file only runs on the server, but
	// there would need to be a workaround (or a `Meteor.isServer` check) if
	// the browser wanted to run this file.
	return Works._collection.rawCollection().distinct(field, {
		[field]: { $exists: true, $nin: ['', null] }
	});
}

Meteor.methods({
	searchTools() {
		const cachedResults = cache.get(CACHE_KEY);

		if (cachedResults) {
			return {
				...cachedResults,
				authors: Authors.find({
					_id: { $in: cachedResults.authors.map(a => new Mongo.ObjectID(a)) },
				 }, {
					 sort: { english_name: 1 }
				 }).fetch()
			};
		}

		const languagesPromise = getDistinctFieldInWorks('language');
		const corporaPromise = getDistinctFieldInWorks('corpus');
		const worksAuthorsPromise = getDistinctFieldInWorks('authors');

		return Promise.all([
			languagesPromise,
			corporaPromise,
			worksAuthorsPromise
		]).then(([ languages, corpora, authorsRaw ]) => {
			languages = languages.sort();
			corpora = corpora.sort();
			authorsRaw = authorsRaw.map(a => a.toString());

			cache.set(CACHE_KEY, {
				languages,
				corpora,
				// `languages` and `corpora` are reasonably small, and
				// unlikely to grow dramatically, so it seems okay to
				// store them as is in the cache. Storing `authors`
				// wholesale, on the other hand, would dramatically
				// increase the size of the cached document, so just
				// store the `_id`s.
				authors: authorsRaw,
			});

			const authors = Authors.find({
				// NOTE: The values of `authorsRaw` need to be converted to Strings
				// (above) and then converted back into ObjectIDs for this query to work.
				_id: { $in: authorsRaw.map(a => new Mongo.ObjectID(a)) }
			}, {
				sort: { english_name: 1 }
			}).fetch();

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
