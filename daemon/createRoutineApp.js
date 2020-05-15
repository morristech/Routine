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
  path = require('path'),
  fs = require('fs'),
  yaml = require('js-yaml'),
  validateProjectName = require('validate-npm-package-name'),
  child_process = require('child_process');

/**
 * Create Routine app.
 *
 * @function
 * @name createRoutineApp
 * @param {string} appName
 * @param {string} destinationPath
 * @param {string} vcs
 * @param {string} template
 * @param {string} packageManager
 * @returns {Promise<boolean>}
 */
function createRoutineApp(
  appName,
  destinationPath,
  template,
  packageManager,
  vcs = 'none'
) {
  return new Promise((resolve, reject) => {
    if (typeof appName === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('my-hamster-app')}`);
      reject('Please specify the project name');
    }
    if (typeof template === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('create-react-app')}`);
      reject('Please specify the template');
    }
    if (typeof destinationPath === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('C:\Users\User\Documents')}`);
      reject('Please specify the project destination');
    }
    if (typeof packageManager === 'undefined') {
      console.log('For example:');
      console.log(`${chalk.green('yarn')}`);
      reject('Please specify the package manager');
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
    const findTempltate = path.join(__dirname, '..', 'templates', template + '.yml');
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
    // checking template url.

  });
}
