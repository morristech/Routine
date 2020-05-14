/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const webpackMerge = require('webpack-merge');
const common = require('./webpack/webpack.common');

const envs = {
  development: 'dev',
  production: 'prod',
};

const env = envs[process.env.APP_ENV || 'development'];
// eslint-disable-next-line import/no-dynamic-require.
const envConfig = require(`./webpack/webpack.${env}.js`);
// webpack-merge tool offers a variety of advanced features for merging.
module.exports = webpackMerge(common, envConfig); 