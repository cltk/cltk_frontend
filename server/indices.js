
import Works from '/imports/collections/works';
import Texts from '/imports/collections/textNodes';

Works._ensureIndex({
	english_title: 'text',
	original_title: 'text',
});

Texts._ensureIndex({
	text: 'text',
});
