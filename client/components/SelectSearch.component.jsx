/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { prototype } from 'enzyme-adapter-react-16';

function SelectSearchComponent(props) {
  /* @props */
  const {
    data,
    defaultStateValue,
    selectTemplate: HandleSelectTemplate,
  } = props;

  /* @state */
  const [template, setTemplate] = useState(defaultStateValue);

  /**
   * Handle template input changes.
   *
   * @function
   * @name HandleTemplateInputChanges
   * @returns {void}
   */
  function HandleTemplateInputChanges(event) {
    setTemplate(event.target.value);
  }

  return (
    <Fragment>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-project-name"
        type="text"
        placeholder={template}
        name="template"
        onChange={HandleTemplateInputChanges}
      />
      <div className="w-full h-48 bg-scroll bg-gray-200">
        <div className="flex flex-no-wrap flex-col">
          {data
            .filter((e) =>
              e.name.toLowerCase().includes(template.toLowerCase()),
            )
            .map((element) => (
              <div
                className="flex items-center p-4 hover:bg-gray-300"
                key={element.name}
                onClick={HandleSelectTemplate(element.name)}
              >
                <img className="w-10 h-10 mr-4" src={element.image} />
                <div className="text-sm">
                  <p
                    className="text-gray-800 text-lg font-medium leading-none"
                    id="element-name"
                  >
                    {element.name}
                  </p>
                  <p className="text-gray-600 text-xs mt-1">
                    {element.createdBy}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
}

SelectSearchComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
    }),
  ),
  selectTemplate: PropTypes.func.isRequired,
  defaultStateValue: PropTypes.string.isRequired,
};

SelectSearchComponent.defaultProps = {
  defaultStateValue: 'Create-react-app',
};

export default SelectSearchComponent;
