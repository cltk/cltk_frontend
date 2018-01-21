# CLTK Archive Community Frontend

[![Join the chat at https://gitter.im/cltk/cltk_frontend](https://badges.gitter.im/cltk/cltk_frontend.svg)](https://gitter.im/cltk/cltk_frontend?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![GitHub tag](https://img.shields.io/github/tag/cltk/cltk_frontend.svg)](https://github.com/cltk/cltk_frontend/releases)
[![GitHub license](https://img.shields.io/badge/license-New%20BSD-blue.svg)](https://raw.githubusercontent.com/cltk/cltk_frontend/master/LICENSE)

# Notice

The CLTK Archive application is currently under active development and is not ready for production.

# About

The goal of this application is to provide a modern reading environment for documents included in the CLTK corpora. Dev builds will be put up at http://archive.cltk.org for the early stages of development.  Text data is ingested from the `cltk_json` directories in the text repositories included in the GitHub organization.


# Development

The CLTK frontend reading environment is built with create-react-app and GraphQL.

To get started developing, [install `yarn`](https://yarnpkg.com/lang/en/docs/install/), clone this repository, and then also clone the [cltk_community_api](https://github.com/cltk/cltk_community_api).


#### Cloning the repo

```bash
git clone https://github.com/cltk/cltk_frontend.git
cd cltk_frontend
```

#### Install dependencies
```bash
yarn
```

#### Running the app

```bash
yarn start
```


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


### Deploying

The CLTK Archive app is currently deployed via Kubernetes on a cluster on Google Cloud Platform. This will be configured with Travis in the future.
