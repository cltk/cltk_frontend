/*
 * For the moment add subscriptions here; in future iterations, make them route
 * specific as necessary
 */

 FlowRouter.subscriptions = function(){
   this.register('works', Meteor.subscribe('works'));
   this.register('texts', Meteor.subscribe('texts'));
   this.register('authors', Meteor.subscribe('authors'));
   this.register('wordforms', Meteor.subscribe('wordforms'));
   this.register('definitions', Meteor.subscribe('definitions'));
 };


/*
 * Routes for application
 */


FlowRouter.route('/works/:author/:work', {
    action: function(params, queryParams) {
        ReactLayout.render(ReadingLayout, {params: params, queryParams: queryParams});
    }
});

FlowRouter.route('/', {
    action: function(params) {
        ReactLayout.render(HomeLayout);
    }

});

FlowRouter.route('/search', {
    action: function(params) {
        ReactLayout.render(MasterLayout, {content:<SearchView />});
    }
});

FlowRouter.route('/about', {
    action: function(params) {
        ReactLayout.render(MasterLayout, {content:<AboutPage />});
    }
});


FlowRouter.route('/terms', {
    action: function(params) {
        ReactLayout.render(MasterLayout, {content:<TermsPage />});
    }
});

FlowRouter.route('/browse', {
    action: function(params) {
        ReactLayout.render(MasterLayout, {content:<BrowseView />});
    }
});
