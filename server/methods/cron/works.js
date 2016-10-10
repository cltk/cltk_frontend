Meteor.method('cron_works', () => {
	const works = Works.find().fetch();

	console.log(' -- Cron run complete: Works');

	works.forEach(work => {
		const countComments = Commentary.find({ work: work.slug }).count();
		const countTranslations = Translations.find({ work: work.slug }).count();
		const countAnnotations = Annotation.find({ work: work.slug }).count();

		// This needs to be an array search in the future
		const entities = [];

		// This needs to lookup on work slug instead of deprecated title value in the future
		const textNodes = Texts.find({ work: work.title }).fetch();

		let rangeN1 = { low: 1, high: 0 };
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
				rangeN5 = { low: 1, high: 0 };
				if (textNode.n_5 > rangeN5.high) {
					rangeN5.high = textNode.n_5;
				}
			}

			if ('n_4' in textNode) {
				rangen4 = { low: 1, high: 0 };
				if (textNode.n_4 > rangeN4.high) {
					rangeN4.high = textNode.n_4;
				}
			}

			if ('n_3' in textNode) {
				rangen3 = { low: 1, high: 0 };
				if (textNode.n_3 > rangeN3.high) {
					rangeN3.high = textNode.n_3;
				}
			}

			if ('n_2' in textNode) {
				rangen2 = { low: 1, high: 0 }; if (textNode.n_2 > rangeN2.high) {
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

		if (rangeN2.high > 0) {
			updates.rangeN2 = rangeN2;
		}
		if (rangeN3.high > 0) {
			updates.rangeN3 = rangeN3;
		}
		if (rangeN4.high > 0) {
			updates.rangeN4 = rangeN4;
		}
		if (rangeN5.high > 0) {
			updates.rangeN5 = rangeN5;
		}

		// console.log("Work Cron Updates:", updates);
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
