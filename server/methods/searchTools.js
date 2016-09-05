
Meteor.methods({
	searchTools() {
		let languages = [];
		let corpora = [];
		let author = {};
		const authors = [];
		let authorsRaw = [];

		languages = _.uniq(Works.find({ language: { $exists: true } }, {
			sort: { language: 1 }, fields: { language: true },
		}).fetch().map((x) => x.language), true);
		corpora = _.uniq(Works.find({ corpus: { $exists: true } }, {
			sort: { corpus: 1 }, fields: { corpus: true },
		}).fetch().map((x) => x.corpus), true);
		authorsRaw = Works.find({ authors: { $exists: true } }, {
			sort: { 'authors.english_name': 1 }, fields: { authors: true },
		}).fetch().map((x) => x.authors);

		authorsRaw.forEach((authorRaw) => {
			author = Authors.findOne({ _id: authorRaw });
			console.log(author);
			if (author && authors.indexOf(author.english_name) < 0) {
				authors.push(author.english_name);
			}
		});

		return {
			languages,
			corpora,
			authors,
		};
	},

});
