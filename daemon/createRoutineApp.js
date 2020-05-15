/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const output = require('./output');
const app = express();

// parse application/json
app.use(bodyParser);

/**
 * The server object listens on port 4200.
 *
 * @var {number}
 */
const $_PORT = process.env.PORT || 4200;

/**
 * The HOST environment variable.
 *
 * @var {string}
 */
const $_HOST = process.env.HOST || '127.0.0.1';

app.listen($_PORT, function (err) {
  if (err) output.error(err);
  output.appStarted($_PORT, $_HOST);
});
