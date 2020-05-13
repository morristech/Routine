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

function AlertComponent(props) {
  /** @props **/
  const { t: lang } = props;

  return (
    <div
      className="text-center py-4 lg:px-4"
      style={{ backgroundColor: '#231f20' }}
    >
      <div
        className="p-3 items-center leading-none lg:rounded-full flex lg:inline-flex"
        role="alert"
      >
        <span className="font-semibold pb-1 cursor-pointer text-gray-100 mr-2 underline text-2xl text-center flex-auto">
          {lang('Alert.component.content')}
          <strong className="text-white">
            {' ' + lang('Alert.component.github')}
          </strong>
        </span>
        <i className="text-white text-4xl ml-2 fa fa-github" />
      </div>
    </div>
  );
}

AlertComponent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces()(AlertComponent);
