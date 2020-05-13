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
import { mount } from 'enzyme';
import SelectSearchComponent from '../components/SelectSearch.component';

let wrapper = null;
// fake data.
let faker = {
  defaultStateValue: 'Create-react-app',
  selectTemplate: jest.fn(() => {}),
  templates: [
    {
      name: 'Create-react-app',
      image: 'https://example.com/react.png',
      createdBy: 'Routine Team',
    },
  ],
};

beforeEach(function () {
  wrapper = (
    <SelectSearchComponent
      defaultStateValue={faker.defaultStateValue}
      selectTemplate={faker.selectTemplate}
      data={faker.templates}
    />
  );
});

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDom.render(wrapper, div);
  ReactDom.unmountComponentAtNode(div);
});

test('renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('check template default value', () => {
  const wrappedEnzyme = mount(wrapper);
  expect(wrappedEnzyme.prop('defaultStateValue')).toStrictEqual(
    faker.defaultStateValue,
  );
  expect(wrappedEnzyme.find('#element-name').at(0).text()).toEqual(
    faker.defaultStateValue,
  );
});
