/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

module.exports = {
  roots: ['./'],
  testRegex: '\\.(test|spec)\\.js$',
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/(build|node_modules|packages)/'],
  setupFiles: ['./configuration/setupTests.js'],
  collectCoverage: true,
  coverageReporters: ['json'],
  transform: {
    '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
