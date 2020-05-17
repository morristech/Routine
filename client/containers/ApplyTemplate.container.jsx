/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, { Fragment, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'validator';
import { withNamespaces } from 'react-i18next';
import binding from '../binding.json';
import WrapperHocComponent from './Wrapper.container';
import SelectSearchComponent from '../components/SelectSearch.component';
import { CreateSandboxContext } from '../SandboxContext';

function ApplyTemplateContainer(props) {
  /* @state */
  const { data, setData } = useContext(CreateSandboxContext);

  const [template, setTemplate] = useState([]);

  /* @props */
  const { t: lang, history } = props;

  useEffect(function () {
    if (isEmpty(data.appName) || isEmpty(data.folderPath)) {
      history.push('/create/sandbox');
    } else {
      fetch(binding['sandbox.get.list.templates'])
        .then((response) => response.json())
        .then(({ data }) => setTemplate(data));
    }
  }, []);

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
            data={template}
            defaultStateValue="create-react-app"
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
