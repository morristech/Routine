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
import { withNamespaces } from 'react-i18next';
import WrapperHocComponent from './Wrapper.container';

function CreateSandboxComponent(props) {
  /* @state */
  const [data, setData] = useState({
    appName: null,
    folderPath: null,
    vcs: null,
  });

  /* @props */
  const { t: lang } = props;

  /**
   * Handle Input Changes.
   *
   * @function
   * @name HandleSandboxChanges
   * @param {event} event
   * @returns {void}
   */
  function HandleSandboxInputChanges(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  }

  /**
   * Handle Creating Sandbox.
   *
   * @function
   * @name HandleCreateSandbox
   * @param {event} event
   * @returns {void}
   */
  function HandleCreateSandbox(event) {
    event.preventDefault();
  }

  return (
    <Fragment>
      <h1 className="text-gray-800 text-center font-sans text-3xl font-bold mt-16 mb-1">
        {lang('CreateSandbox.component.title')}
      </h1>
      <p className="mb-6 text-center text-gray-600">
        {lang('CreateSandbox.component.sub.title')}
      </p>
      <div className="max-w-sm mx-auto mt-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-project-name"
          >
            {lang('CreateSandbox.component.project.folder')}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-project-name"
            type="text"
            placeholder="my-hamster-app"
            name="appName"
            onChange={HandleSandboxInputChanges}
          />
          <p className="text-gray-600 text-xs italic">
            {lang('CreateSandbox.component.project.folder.info')}
          </p>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 relative">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-directory-path"
          >
            {lang('CreateSandbox.component.directory.path')}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-directory-path"
            type="text"
            placeholder="C:\Users\User\Documents"
            name="folderPath"
            onChange={HandleSandboxInputChanges}
          />
          <i className="pointer-events-none text-lg fa fa-folder absolute inset-y-0 right-0 flex items-center pr-4 mt-4 text-gray-700" />
        </div>
        <div className="flex flex-wrap justify-between -mx-3 mb-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-cvs"
          >
            {lang('CreateSandbox.component.vcs')}
          </label>
          <div className="w-full relative">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-cvs"
              name="vcs"
              onChange={HandleSandboxInputChanges}
            >
              <option>Git</option>
              <option>Mercurial</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700"
            onClick={HandleCreateSandbox}
          >
            {lang('CreateSandbox.component.submit')}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

CreateSandboxComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default WrapperHocComponent(withNamespaces()(CreateSandboxComponent));
