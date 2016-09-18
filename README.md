# Notice

The Classics Archive application is currently under active development and is not ready for production.

# About  

The goal of this application is to provide a modern reading environment for documents included in the CLTK corpora. Dev builds will be put up at http://api.cltk.org for the early stages of development.  Text data is consumed by the API under development at this repository: https://github.com/cltk/cltk_api


# Development

The CLTK frontend reading environment is built with Meteor and React.  

To get started developing:

1.  [Install Meteor](https://www.meteor.com/install)
2.  Clone this repo
3.  In the application root directory run "npm install" and then "meteor" to start the application
4.  If there is no text data in your database, the application will try to sync document data from the CLTK API (as defined in /server/text-server-sync.js). Please allow a few moments for the process to take place and watch your console for sync information.

For managing lists of outstanding development items, we're using ZenHub: https://www.zenhub.io/.  If you're interested in contributing, please consider installing the ZenHub plugin for your browser.


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

We need to serve text and all the related materials to the web browser with the least possible load time.  It will not be possible to identify, extract, and serve metadata (such as entities and related passages) on the fly, much as that would simply the task.  Instead, we need to overcome the challenge of the time and server resources required to predict and mining the data for related materials by caching the source text from the [CLTK API](https://github.com/cltk/cltk_api) in the Meteor application's Mongo database and then for each passage of the source text, query the CLTK API for each type of related material.  

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
The server hosting this application will need Node 0.10.40 (nvm recommended), MongoDB, and NGINX.

First, rsync the generated tar.gz file to the server. Extract the build archive in a directory of your choice (ideally one that makes sense with the build version--1.0.1, 1.1.0, etc.).

Ensure you are using the correct version of Node for your build and cd to ./bundle/programs/server of your extracted application and run
```
npm install
```

Configure a Upstart service file as described in the tutorial linked at the start of this section. Ensure all parameters included in the file are set appropriately.

Configure and enable an NGINX virtual host to proxy requests to the port the application is listening on.

Start the Upstart service with whatever you named your service file.  Something such as this:
```
sudo start cltk_frontend
```
If you named your Upstart service file cltk_frontend.conf

## Building and Deploying with Docker

From the meteor-starter application, here's a good workflow for interacting with docker:


for Dev

```
docker build -t myrepo/meteordev -f Dockerfile-dev .
```

Run

```
docker run -it -p 3000:3000 --rm myrepo/meteordev
```


for Prod

```
docker build -t myrepo/mymeteorapp .
```

Run it
```
docker run --name mongodb -d mongo
docker run -it --rm -p 3000:3000 --link mongodb:db -e "MONGO_URL=mongodb://db" -e "ROOT_URL=http://localhost:3000" myrepo/mymeteorapp
```
