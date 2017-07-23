import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import 'ion-rangeslider/js/ion.rangeSlider.js';
import 'ion-rangeslider/css/ion.rangeSlider.css';
import 'ion-rangeslider/css/ion.rangeSlider.skinFlat.css';
import 'mdi/css/materialdesignicons.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import injectTapEventPlugin from 'react-tap-event-plugin';

// lib
import '/imports/lib/config/emails';
import '/imports/lib/config/i18n';
import '/imports/lib/config/oauth';
import { renderRoutes } from './client/routes';

Meteor.startup(() => {
	injectTapEventPlugin();
  render(renderRoutes(), document.getElementById('app'));
});
