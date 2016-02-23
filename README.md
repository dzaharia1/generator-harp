# Harp Static Site Generator... Generator

Before you being, you might want to familiarize yourself with harp at http://harpjs.com/.
This generator currently creates a harp project using EJS, vanilla javascript and sass, but you can also use Markdown, Jade, LESS, Stylus and Coffeescript for preprocessing your site.

## Getting Started

You will need to have NPM installed. Get it at http://nodejs.org.

## Installing Prerequisites: Node, Gulp and Harp

Once you have node installed, use npm to install all prerequisites

`$ npm install -g yo gulp harp`

if you get an EACCESS error, run this command with sudo

## Install this generator

`$ npm install -g generator-harp`

if you get an EACCESS error, run this command with sudo

## Create your project!

`$ mkdir project-name`
`$ cd project-name`
`$ yo harp`

## Run the application

to run the site locally for development, just use the command `$ gulp`.

to compile down the static site assets to publish to a service like github pages, use the command `$ npm run compile` in the project's root directory.

You'll find the compiled site in a folder called `dist` in the project directory.

## Directory Structure

    /project-main
      gulpfile.js................... gulp tasks for harp server and build
      harp.json..................... defines the root of the harp project
      package.json.................. defines project dependencies
      /public....................... directory for all public facing assets
        _layout.ejs................. base markup including <head> which will wrap your views
        index.ejs................... index file which will be templated into _layout.ejs
        /css
          main.scss................. the primary manifest and base styles for your sass
          /partials................. this directory is here to contain your sass partials
          /scaffolding.............. some scaffolding and base declarations
            _colors.scss............ a file to define color variables
            _type.scss.............. a file to define type variables
            _scaffolding.scss....... a file in which I've included some flexbox placeholders, breakpoint mixins and more for you to optionally use
        /scripts.................... where you will store your javascript
          ui.js..................... a base, vanilla javscript file with an empty onLoad structure
        /views...................... where you will build individual pages' markup
          /partials................. where you will build reusable ejs partials
        /img........................ where you will store all image assets
