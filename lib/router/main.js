
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


FlowRouter.route('/works/:slug/1', {
    action: function(params) {
        ReactLayout.render(ReadingLayout);
    }
});
