/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

const console = {
  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Called when api-docs app starts on given port w/o errors
  appStarted: (port, host) => {
    console.log(`Deamon started ! ${chalk.green('✓')}`);
    console.log(`
     ${chalk.bold('Access URLs:')}${divider}
     Localhost: ${chalk.magenta(`http://${host}:${port}`)}
     LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}
     ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
  },
};

module.exports = console;
