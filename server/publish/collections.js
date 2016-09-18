/*
* Replace these in the future as they will publish our entire collections.
*/

if (Meteor.isServer) {
	Meteor.publish('attachments', () => Attachments.find());

	Meteor.publish('authors', () => Authors.find());

	Meteor.publish('corpora', () => Corpora.find());

	Meteor.publish('languages', () => Languages.find());

	Meteor.publish('textNodes', (query, limit) => {
		check(query, Object);
		check(limit, Number);
		return Texts.find(query, { limit, sort: { n_1: 1, n_2: 1, n_3: 1, n_4: 1, n_5: 1 } });
	});

	Meteor.publish('works', (query, skip, limit) => {
		if(!skip){
			skip = 0;
		}
		if(!limit){
			limit = 0;
		}

		check(query, Object);
		check(skip, Number);
		check(limit, Number);

		return Works.find(query, { limit, sort: { english_title: 1 } });
	});

	Meteor.publish('definitions', definitionIds => {
		check(definitionIds, [String]);
		return Definitions.find({ _id: { $in: definitionIds } });
	});

	Meteor.publish('wordForms', textIds => {
		check(textIds, [String]);
		return Wordforms.find({ texts: { $in: textIds } });
	});

	Meteor.publish('translations', work => {
		check(work, String);
		return Translations.find({ work });
	});

	Meteor.publish('commentary', work => {
		check(work, String);
		return Commentary.find({ work });
	});

	Meteor.publish('annotation', function publishAnnotation() {
		if (this.userId) {
			return Annotation.find({
				$or: [
					{ isPrivate: false },
					{ user: this.userId },
				],
			});
		}
		return Annotation.find({ isPrivate: false });
	});

	Meteor.publish('bookmark', function publishBookmark() {
		if (this.userId) {
			return Meteor.users.find({ _id: this.userId }, { fields: { bookmarks: 1 } });
		}
		return this.ready();
	});
}
