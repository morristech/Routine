/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

var chalk = require('chalk'),
  app = require('express')(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  path = require('path'),
  fs = require('fs'),
  util = require('util'),
  yaml = require('js-yaml'),
  validateProjectName = require('validate-npm-package-name'),
  child_process = require('child_process'),
  output = require('./output');

// convert callback to promise
const readFile = util.promisify(fs.readFile);

// secure your Express apps by setting various HTTP headers
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// parse application/json
app.use(bodyParser.json());

app.get('/sandbox/list/templates', function (req, res) {
  return res.status(200).json({
    data: [],
  });
});

/**
 * Get all supported templates.
 *
 * @internals
 * @function
 * @name getAllTemplates
 * @return {Promise<Array>}
 */
function getAllTemplates() {}

/**
 * Create Routine app.
 *
 * @internals
 * @function
 * @name createRoutineApp
 * @param {string} appName
 * @param {string} destinationPath
 * @param {string} vcs
 * @param {string} template
 * @param {string} packageManager
 * @returns {Promise<boolean>}
 */
function createRoutineApp(appName, destinationPath, template, vcs = 'none') {
  return new Promise((resolve, reject) => {
    if (typeof appName === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('my-hamster-app')}`);
      reject('Please specify the project name');
    }
    if (typeof template === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('create-express-app')}`);
      reject('Please specify the template');
    }
    if (typeof destinationPath === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('C:UsersUserDocuments')}`);
      reject('Please specify the project destination');
    }
    // validate app name
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
      reject(
        `Cannot create a project named ${chalk.green(
          `"${appName}"`,
        )} because of npm naming restrictions:\n`,
      );
    }
    console.log();
    console.log(`${appName} accepted ${chalk.green('✓')}`);
    const findTempltate = path.join(
      __dirname,
      '..',
      'templates',
      template + '.yml',
    );
    // load template file example create-react-app.yml
    let fileContents = fs.readFileSync(findTempltate, 'utf8');
    // convert YAML file data to JS literals and objects.
    let extractData = yaml.safeLoad(fileContents);
    if (typeof extractData !== 'object')
      reject('fileContents must be an object');
    //
    console.log();
    console.log(`You are using ${extractData.name}`);
    console.log(`You are using ${extractData.version}v`);
    // fetching template url.
    return getTemplateInstall(extractData.from, destinationPath).then(
      (result) => {
        console.log(result);
        console.log(`template installed successfully ${chalk.green('✓')}`);
        // Install given scripts.
        getInstallScripts(extractData.cmd.join(' && ')).then((result) => {
          console.log(`commands installed successfully ${chalk.green('✓')}`);
          if (vcs === 'git') {
            console.log('init git ...');
            initGitRepository(destinationPath).then((response) =>
              resolve('ok'),
            );
          } else {
            resolve('ok');
          }
        });
      },
    );
  });
}

/**
 * Install Given Template from url.
 *
 * @internals
 * @function
 * @name getTemplateInstall
 * @param {string} url
 * @param {string} dest
 * @returns {Promise<string>}
 */
function getTemplateInstall(url, dest) {
  let commandInstall = null;
  console.log('Fetching template...');
  return new Promise((resolve, reject) => {
    if (/^(https:\/\/github.com).+/.test(url)) {
      console.log(`Fetching from ${chalk.yellow('github')} repository...`);
      commandInstall = `git clone ${url} ${dest}`;
    } else {
      console.log('For example:');
      console.log(
        `${chalk.green('https://github.com/getspooky/create-express-app')}`,
      );
      reject('The given url is not valid');
    }
    console.log('Installing template ...');
    child_process.exec(commandInstall, (err, stdout) => {
      if (err) {
        console.log(`Something went wrong ...`);
        reject(err);
      }
      resolve('ok');
    });
  });
}

/**
 * Install scripts.
 *
 * @internals
 * @function
 * @name getInstallScripts
 * @param {string} cmd
 * @returns {Promise<string>}
 */
function getInstallScripts(cmd) {
  console.log('Installing scripts...');
  return new Promise((resolve, reject) => {
    if (typeof cmd !== 'string') {
      reject('cmd param must be of type string');
    }
    child_process.exec(commandInstall, (err, stdout) => {
      if (err) {
        console.log(`Something went wrong ...`);
        reject(err);
      }
      console.log(stdout);
      resolve('ok');
    });
  });
}

/**
 * Init Git repository.
 *
 * @internals
 * @function
 * @name initGitRepository
 * @param {string} dest
 * @returns {Promise<any>}
 */
function initGitRepository(dest) {
  return new Promise((resolve, reject) => {
    exec(`cd ${dest} && git init`, (err, stdout) => {
      if (err) {
        reject(new TypeError(err));
      } else {
        resolve(stdout);
      }
    });
  });
}

/**
 * The server object listens on port 4200.
 *
 * @var {number}
 */
const port = process.env.PORT || 4200;

/**
 * The HOST environment variable.
 *
 * @var {string}
 */
const host = process.env.HOST || '127.0.0.1';

app.listen(port, function (err) {
  if (err) output.error(err);
  output.appStarted(port, host);
});
