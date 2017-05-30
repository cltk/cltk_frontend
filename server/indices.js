
import Works from '/imports/api/collections/works';
import Texts from '/imports/api/collections/textNodes';

Works._ensureIndex({
	english_title: 'text',
	original_title: 'text',
});

Texts._ensureIndex({
	text: 'text',
});
