var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

function dasherize (inputString) {
  inputString = inputString.toLowerCase();
  return inputString.replace(/ /g, '-');
}

module.exports = generators.Base.extend ({
  prompting: function () {
    var done = this.async();
    this.log(yosay('Alright, let\'s scaffold out a Harp project!'));

    var prompts = [
      {
        name: 'siteTitle',
        message: 'What is the title of your site?',
        default: this.destinationRoot().split('/')[this.destinationRoot().split('/').length - 1]
      },
      {
        name: 'author',
        message: 'What is your name?'
      }
    ];

    this.prompt(
      prompts,
      function (answers) {
        this.siteTitle = answers.siteTitle;
        this.siteName = dasherize(answers.siteTitle);
        this.author = answers.author;
        done();
      }.bind(this));
  },

  configuring: function () {
    this.log(this.siteName);
  },

  writing: function () {
    var i;

    var templates = [
      { "src": "_gulpfile.js", "dest": "gulpfile.js" },
      { "src": "_harp.json", "dest": "harp.json" },
      { "src": "_package.json", "dest": "package.json" },
      { "src": "_main.scss", "dest": "public/css/main.scss" },
      { "src": "_type.scss", "dest": "public/css/scaffolding/_type.scss" },
      { "src": "_colors.scss", "dest": "public/css/scaffolding/_colors.scss" },
      { "src": "_utilities.scss", "dest": "public/css/scaffolding/_utilities.scss" },
      { "src": "_layout.ejs", "dest": "public/_layout.ejs" },
      { "src": "_index.ejs", "dest": "public/index.ejs" },
      { "src": "_gitignore", "dest": ".gitignore" },
      { "src": "_ui.js", "dest": "public/scripts/ui.js" }
    ];

    var directories= [
      'public/img',
      'public/css',
      'public/css/scaffolding',
      'public/css/partials',
      'public/scripts',
      'public/views/partials'
    ];

    var templateData = {
      siteName: this.siteName,
      author: this.author,
      siteTitle: this.siteTitle,
      layoutYield: '<%- yield %>'
    }

    this.log(yosay('Alright, let\'s lay down the files!'));

    for (var i = 0; i < templates.length; i ++) {
      var thisTemplate = templates[i];
      this.fs.copyTpl(
        this.templatePath(thisTemplate.src),
        this.destinationPath(thisTemplate.dest),
        templateData
      );
    }

    for (i = 0; i < directories.length; i ++) {
      this.mkdir(directories[i])
    }
  },

  install: function () {
    this.log(yosay('Done scaffolding. Installing dependencies.'));
    this.npmInstall(['gulp', 'gulp-minify', 'minify', 'gulp-gh-pages', 'browser-sync'], { 'saveDev': true });
    this.npmInstall(['express', 'compression', 'harp'], { 'save': true });
  },

  end: function () {
    this.log(yosay('All set.\nLet\'s talk a bit about how to use this thing.'));
    this.log('To run your website locally for development, run ' + chalk.red('`$ gulp`') + ' in your terminal.\nGulp will monitor your files. On any save, it will compile sass, minify your javascript, compile your markup and refresh your browser!\n\nEasy breasy.\n\n\n');
    this.log('To run a build of the static site, run ' + chalk.red('`$ npm run compile`') + ' in your terminal.\nYour website will be built into a folder called ' + chalk.yellow('\'dist\''));
  }
});
