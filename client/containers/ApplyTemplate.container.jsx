/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import WrapperHocComponent from './Wrapper.container';
import { CreateSandboxContext } from '../SandboxContext';
import SelectSearchComponent from '../components/SelectSearch.component';

function ApplyTemplateContainer(props) {
  /* @state */
  const { data, setData } = useContext(CreateSandboxContext);

  /* @props */
  const { t: lang } = props;

  /**
   * Handle Input Changes.
   *
   * @function
   * @name HandleTemplateInputChanges
   * @param {event} event
   * @returns {void}
   */
  function HandleTemplateInputChanges(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  /**
   * Select given template.
   *
   * @function
   * @name HandleSelectTemplate
   * @param {string} givenTemplate
   * @returns {event}
   */
  function HandleSelectTemplate(givenTemplate) {
    return (event) => {
      setData({
        ...data,
        template: givenTemplate,
      });
    };
  }

  /**
   * Handle Building Sandbox.
   *
   * @function
   * @name HandleBuildSandbox
   * @param {event} event
   * @returns {void}
   */
  function HandleBuildSandbox(event) {
    event.preventDefault();
  }

  return (
    <Fragment>
      <h1 className="text-gray-800 text-center font-sans text-4xl font-bold mt-16 mb-1">
        {lang('Template.component.title')}
      </h1>
      <p className="mb-6 text-xl text-center text-gray-600">
        {lang('Template.component.sub.title')}
      </p>
      <div className="max-w-sm mx-auto mt-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-project-name"
          >
            {lang('Template.component.official.tamplate')}
          </label>
          {/* Filter Teamplate */}
          <SelectSearchComponent
            data={[
              {
                name: 'Laravel',
                image: 'https://laravel.com/img/logomark.min.svg',
                createdBy: 'By Routine Core Team',
              },
            ]}
            defaultStateValue="Laravel"
            selectTemplate={HandleSelectTemplate}
          />
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700"
            onClick={HandleBuildSandbox}
          >
            {lang('CreateSandbox.component.build')}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

ApplyTemplateContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default WrapperHocComponent(withNamespaces()(ApplyTemplateContainer));
