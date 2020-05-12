/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import Footer from './Footer.component';

function AlertComponent(props) {
  const { t: lang } = props;
  return (
    <div className="bg-indigo-900 text-center py-4 lg:px-4">
      <div
        className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
          {lang('Alert.component.badge')}
        </span>
        <span className="font-semibold mr-2 text-left flex-auto">
          {lang('Alert.component.content')}
        </span>
        <svg
          className="fill-current opacity-75 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      </div>
    </div>
  );
}

AlertComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(AlertComponent);
