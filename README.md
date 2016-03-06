# Notice

The Classics Archive application is currently under active development and is not ready for production.

# About  

The goal of this application is to provide a modern reading environment for documents included in the CLTK corpora. Dev builds will be put up at http://api.cltk.org for the early stages of development.  Currently all demo data in the application is static, but in the future, text data will be consumed by the API under development at this repository: https://github.com/cltk/cltk_api


# Development

The CLTK frontend reading environment is built with Meteor and React.  

To get started developing:
1. [install Meteor](https://www.meteor.com/install).  
1. Clone this repo
1. In the application root directory run "$ meteor" to start the application.

For managing lists of outstanding development items, we're using ZenHub: https://www.zenhub.io/.  If you're interested in contributing, please consider installing the ZenHub plugin for your browser.


# Project Goals and Status

The goal of this application to to provide an immersive multimedia reading environment that includes the related materials necessary for study of classical texts.  When someone reads Latin, for instance, their desk will often be filled with several books draped over each other (the source text, a dictionary, a commentary, a translation, a notebook, etc).  This reading environment will simplify the reading experience by providing all of those materials in a browser or on a mobile device.  Read more about it on [the CLTK ideas page](https://github.com/cltk/cltk/wiki/Project-ideas).

The application is currently still in the initial stages of development.  The code currently available in this repository is largely to serve as a guide for the visual appearance of the application when it is functional.  

A list of targeted related materials that this application will seek to provide in addition to the source text:

* Definitions
* Scholarly commentary
* Translations of text (may partner with machine translation interface to Moses idea listed on the ideas page)
* Related passages (areas where the author of the source text borrowed from or influenced other authors included in the corpora included in the CLTK)
* Media (any visualizations, paintings, images, videos of reconstructions, enactments, etc. that are related to the source text)
* Scansion
* Entity recognition
* Contemporary criticism
* User annotations and bookmarks
* your_idea.match(/.\*/) - any other materials that you have a vision for and the community wants to use

We know that including all of these is possible and useful based on a previous iteration of this project available at [segetes.io](http://segetes.io), which offers the works of Vergil with accompanying related materials such as these.


# Challenges

We need to serve text and all the related materials to the web browser with the least possible load time.  _It will not be possible to identify, extract, and serve metadata (such as entities and related passages) on the fly_, much as that would simply the task.  Instead, we need to overcome the challenge of the time and server resources required to predict and mining the data for related materials by caching the source text from the [CLTK API](https://github.com/cltk/cltk_api) in the Meteor application's Mongo database and then for each passage of the source text, query the CLTK API for each type of related material.  

Instead of the traditional model of a client-side Javascript application querying an API and rendering a JSON response to the page every time the page is loaded, this application will rely on server-side Javascript to sync content continually from the API, and Meteor's [DDP](https://www.meteor.com/ddp) layer will take care of rendering the data that is stored in the application database.  
