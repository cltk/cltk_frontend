Meteor.method('cron_works', () => {
	const works = Works.find().fetch();

	console.log(' -- Beginning cron for Works');

	works.forEach((work, i) => {
		const countComments = Commentary.find({ work: work._id }).count();
		const countTranslations = Translations.find({ work: work._id }).count();
		const countAnnotations = Annotation.find({ work: work._id }).count();

		// This needs to be an array search in the future
		const entities = [];

		// This needs to lookup on work slug instead of deprecated title value in the future
		const textNodes = Texts.find({ work: work._id }).fetch();
		// console.log("textNodes for work:", work.english_title, textNodes.length);
		if (textNodes.length === 0) {
			console.log('No textNodes found for work:', work._id, work.english_title);
		}

		const rangeN1 = { low: 1, high: 1 };
		let rangeN2 = null;
		let rangeN3 = null;
		let rangeN4 = null;
		let rangeN5 = null;

		textNodes.forEach(textNode => {
			if ('entities' in textNode) {
				textNode.entities.forEach(entityId => {
					if (entities.indexOf(entityId) < 0) {
						entities.push(entityId);
					}
				});
			}

			if ('n_5' in textNode) {
				if (!rangeN5) {
					rangeN5 = { low: 1, high: 1 };
				}
				if (textNode.n_5 > rangeN5.high) {
					rangeN5.high = textNode.n_5;
				}
			}

			if ('n_4' in textNode) {
				if (!rangeN4) {
					rangeN4 = { low: 1, high: 1 };
				}
				if (textNode.n_4 > rangeN4.high) {
					rangeN4.high = textNode.n_4;
				}
			}

			if ('n_3' in textNode) {
				if (!rangeN3) {
					rangeN3 = { low: 1, high: 1 };
				}
				if (textNode.n_3 > rangeN3.high) {
					rangeN3.high = textNode.n_3;
				}
			}

			if ('n_2' in textNode) {
				if (!rangeN2) {
					rangeN2 = { low: 1, high: 1 };
				}
				if (textNode.n_2 > rangeN2.high) {
					rangeN2.high = textNode.n_2;
				}
			}

			if ('n_1' in textNode) {
				if (textNode.n_1 > rangeN1.high) {
					rangeN1.high = textNode.n_1;
				}
			}
		});

		const updates = {
			countComments,
			countTranslations,
			countEntities: entities.length,
			countAnnotations,
			rangeN1,
		};

		if (rangeN2 && rangeN2.high > 0) {
			updates.rangeN2 = rangeN2;
		}
		if (rangeN3 && rangeN3.high > 0) {
			updates.rangeN3 = rangeN3;
		}
		if (rangeN4 && rangeN4.high > 0) {
			updates.rangeN4 = rangeN4;
		}
		if (rangeN5 && rangeN5.high > 0) {
			updates.rangeN5 = rangeN5;
		}

		console.log('Work', (i + 1), 'of', works.length, ':', work.english_title, updates);
		Works.update({ _id: work._id }, { $set: updates });
	});


	return 1;
}, {
	url: 'cron/works',
	getArgsFromRequest() {
		// Do validation here if necessary for pagination

		return [];
	},
});
