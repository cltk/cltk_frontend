import Authors from '/imports/collections/authors';
import Works from '/imports/collections/works';

Meteor.methods({
	searchTools() {
		let languages = [];
		let corpora = [];
		let author = {};
		const authors = [];

		languages = _.uniq(Works.find({ workLanguage: { $exists: true } }, {
			sort: { workLanguage: 1 }, fields: { workLanguage: true },
		}).fetch().map((x) => x.workLanguage), true);
		corpora = _.uniq(Works.find({ corpus: { $exists: true } }, {
			sort: { corpus: 1 }, fields: { corpus: true },
		}).fetch().map((x) => x.corpus), true);
		worksAuthorsRaw = Works.find({ authors: { $exists: true } }, {
			sort: { 'authors.english_name': 1 }, fields: { authors: true },
		}).fetch().map((x) => x.authors);

		worksAuthorsRaw.forEach((authorsRaw) => {
			authorsRaw.forEach((authorRaw) => {
				author = Authors.findOne({ _id: authorRaw });
				if (author && !(authors.some((existingAuthor) =>
					existingAuthor._id._str === author._id._str
				))) {
					authors.push(author);
				}
			});
		});

		return {
			languages,
			corpora,
			authors,
		};
	},

});
