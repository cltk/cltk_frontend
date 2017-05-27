# Notice

[![Join the chat at https://gitter.im/cltk/cltk_frontend](https://badges.gitter.im/cltk/cltk_frontend.svg)](https://gitter.im/cltk/cltk_frontend?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The Classics Archive application is currently under active development and is not ready for production.

# About  

The goal of this application is to provide a modern reading environment for documents included in the CLTK corpora. Dev builds will be put up at http://archive.cltk.org for the early stages of development.  Text data is ingested from the cltk_json directories in the


# Development

The CLTK frontend reading environment is built with Meteor and React.  

To get started developing:

#### Install meteor
Here's the instructions: https://www.meteor.com/install

#### Cloning the repo

```bash
git clone https://github.com/cltk/cltk_frontend.git
cd cltk_frontend
git submodule update --init --recursive
```
#### Running the app

```bash
meteor npm install
meteor
```

#### Database

In order to use the database with your meteor instance, we recommend restoring the database to your meteor application instance (but you could as easily use an external mongodb server as well and configure the MONGO_URL param when starting meteor). You will need the mongodb package installed on your local machine to restore the database to your local copy of the application.

First, download the database dump from here: https://storage.googleapis.com/archimedes-data--regional/cltk/dump-without-users.tgz NOTICE: This database dump, when restored to Mongo, creates a database sized at 7.950GB.

Unzip and -tar the database dump:

```
tar zxvf dump.tgz
```

Restore the dump to your running meteor application database:

```
mongorestore -h localhost:3001 -d meteor --drop dump/cltk_frontend_dev
```

# Linting configuration

We now have an updated, more permissive eslint configuration. We suggest adding an eslint plugin to your editor of choice.

For example, options for integrating with the Atom editor are the following:
https://atom.io/packages/linter
https://atom.io/packages/eslint


# Contributing

1. Run `meteor npm run lint` and make sure there are no errors.
2. Make your PR against the `develop` branch.


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

We need to serve text and all the related materials to the web browser with the least possible load time. It will not be possible to identify, extract, and serve metadata (such as entities and related passages) on the fly, much as that would simply the task.  Instead, we need to overcome the challenge of the time and server resources required to predict and mining the data for related materials by caching the source text from the [CLTK API](https://github.com/cltk/cltk_api) in the Meteor application's Mongo database and then for each passage of the source text, query the CLTK API for each type of related material.  

Instead of the traditional model of a client-side Javascript application querying an API and rendering a JSON response to the page every time the page is loaded, this application will rely on server-side Javascript to sync content continually from the API, and Meteor's [DDP](https://www.meteor.com/ddp) layer will take care of rendering the data that is stored in the application database.  

For more information and images of the proposed web application architecture, please reference this wiki page: https://github.com/cltk/cltk_frontend/wiki/Web-Application-Software-Architecture-Diagram

# Build/Deployment

In general, building, deploying, and hosting this application follows the workflow described [here](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx).

### Building
In the application directory, run the following command:
```
meteor build .
```
(or if you like storing your build files in named directories, something like "meteor build ../builds/1.0.1/")

### Deploying

The CLTK Archive Meteor app is currently deployed via Kubernetes on a cluster on Google Cloud Platform. In order to build and push an image to the container repository on GCP, you can run ./bin/build_all, and we hopefully will integrate with a CI server at some point in the future to automate this process.
