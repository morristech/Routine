/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import WrapperHocComponent from './Wrapper.container';
import '../styles/animate.css';

function ImportTemplateContainer(props) {
  /* @props */
  const { t: lang } = props;

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
            style={{ fontSize: '9.32rem' }}
          />
          <p className="w-full text-center px-4 text-gray-600 text-xs">
            {lang('Import.component.compress.alert')}
          </p>
        </div>
      </div>
      <div className="max-w-sm mx-auto mt-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 border border-blue-700">
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
