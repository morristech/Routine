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
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert2';
import WrapperHocComponent from './Wrapper.container';
import binding from '../binding.json';
import '../styles/animate.css';

function ImportTemplateContainer(props) {
  /* @state */
  const [templateFile, setTemplateFile] = useState(null);

  /* @props */
  const { t: lang } = props;

  /**
   * Handle File Change.
   *
   * @function
   * @name HandleFileChange
   * @param {event} event
   * @returns {void}
   */
  function HandleFileChange(event) {
    event.preventDefault();
    setTemplateFile(event.target.files[0]);
  }

  /**
   * Handle Create Template.
   *
   * @function
   * @name HandleCreateTemplate
   * @param {event} event
   * @returns {void}
   */
  function HandleCreateTemplate(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', templateFile);
    fetch(binding['sandbox.import.template'], {
      method: 'POST',
      mode: 'no-cors', // no-cors
      body: formData,
    }).then((response) => {
      // display sweet alert message.
      SweetAlert.fire(
        lang('Import.container.sweetalert.success'),
        lang('Import.container.sweetalert.create.template'),
        'success',
      );
    });
  }

  return (
    <Fragment>
      <h1 className="text-gray-800 text-center font-sans text-4xl font-bold mt-16 mb-1">
        {lang('Import.component.title')}
      </h1>
      <p className="mb-6 text-xl text-center text-gray-600">
        {lang('Import.component.sub.title')}
      </p>
      <div className="max-w-sm mx-auto mt-10">
        <div className="flex flex-wrap flex-column justify-center">
          <i
            className="fa fa-cloud-upload pulse text-gray-400 rounded-full"
            style={{ fontSize: '9.52rem' }}
          />
          <input
            type="file"
            name="template_file"
            className="mb-1 mt-4"
            onChange={HandleFileChange}
          />
          <p className="w-full text-center px-4 text-gray-600 text-xs">
            {lang('Import.container.create.template.alert')}
            <br />
            <a href="" className="underline text-xs text-blue-500">
              {lang('Common.click.here')}
            </a>
          </p>
        </div>
      </div>
      <div className="max-w-sm mx-auto mt-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700"
            onClick={HandleCreateTemplate}
          >
            {lang('Import.component.submit')}
          </button>
        </div>
      </div>
    </Fragment>
  );
}

ImportTemplateContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default WrapperHocComponent(withNamespaces()(ImportTemplateContainer));
