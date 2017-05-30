
import Annotations from '/imports/api/collections/annotations';
import Authors from '/imports/api/collections/authors';
import Commentary from '/imports/api/collections/commentary';
import Corpora from '/imports/api/collections/corpora';
import Definitions from '/imports/api/collections/definitions';
import Languages from '/imports/api/collections/languages';
import TextNodes from '/imports/api/collections/textNodes';
import Translations from '/imports/api/collections/translations';
import Wordforms from '/imports/api/collections/wordforms';
import Works from '/imports/api/collections/works';

/*
* Replace these in the future as they will publish our entire collections.
*/
/* eslint new-cap: "off" */
if (Meteor.isServer) {
	Meteor.publish('attachments', () => Attachments.find());

	Meteor.publish('authorsCount', function getAuthorCounts() {
		Counts.publish(this, 'authorsCount', Authors.find());
	});
	Meteor.publish('authors', () => Authors.find());

	Meteor.publish('corpora', () => Corpora.find());

	Meteor.publish('languages', () => Languages.find());

	Meteor.publish('textNodes', (query = {}, limit = 0) => {
		check(query, Object);
		check(limit, Number);
		return TextNodes.find(query, { limit, sort: { n_1: 1, n_2: 1, n_3: 1, n_4: 1, n_5: 1 } });
	});

	Meteor.publish('works', (query = {}, skip = 0, limit = 10) => {
		check(query, Object);
		check(skip, Number);
		check(limit, Number);
		return Works.find(query, { skip, limit, sort: { english_title: 1 } });
	});

	Meteor.publish('worksCount', function getWorksCount() {
		Counts.publish(this, 'worksCount', Works.find());
	});

	Meteor.publish('workSingle', (query = {}) => {
		check(query, Object);
		return Works.find(query, { limit: 1 });
	});

	Meteor.publish('definitions', definitionIds => {
		check(definitionIds, [String]);
		return Definitions.find({ _id: { $in: definitionIds } });
	});

	Meteor.publish('wordForms', textIds => {
		// check(textIds, [Object]);
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

	Meteor.publish('annotation', function pubAnnotation(query = {}, skip = 0, limit = 100) {
		check(query, Object);
		check(skip, Number);
		check(limit, Number);

		if (this.userId) {
			return Annotations.find({
				$or: [
					{ isPrivate: false },
					{ user: this.userId },
				],
			});
		}
		return Annotations.find({ isPrivate: false });
	});

	Meteor.publish('bookmark', function publishBookmark() {
		if (this.userId) {
			return Meteor.users.find({ _id: this.userId }, { fields: { bookmarks: 1 } });
		}
		return this.ready();
	});

	Meteor.publish('worksShelf', function publishBookmark() {
		if (this.userId) {
			return Meteor.users.find({ _id: this.userId }, { fields: { worksShelf: 1 } });
		}
		return this.ready();
	});
}
