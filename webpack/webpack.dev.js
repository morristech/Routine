/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const webpack = require('webpack');
const { outputPath } = require('./paths');

// files regexes
const cssRegex = /\.(css|scss)$/;

module.exports = {
  mode: 'development',
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: cssRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [  
    // Enables Hot Module Replacement, otherwise known as HMR.  
    new webpack.HotModuleReplacementPlugin()
  ],
};