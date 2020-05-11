/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import ReactDom from 'react-dom';
import '../../__mocks__/react-i18next';
import NavbarComponent from './Navbar.component';

let wrapper = null;

beforeEach(function () {
  wrapper = <NavbarComponent logoSrc="https://example/com/image.png" />;
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(wrapper, div);
  ReactDom.unmountComponentAtNode(div);
});

test('renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
