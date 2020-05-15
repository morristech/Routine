/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

function NavbarComponent(props) {
  /** @state **/
  const { t: lang } = props;
  return (
    <div className="w-full">
      <div className="border-color-b20974" />
      <div className="px-24 py-4 text-gray-900 bg-white shadow font-medium capitalize">
        <span className="mr-2 pr-2 border-r border-gray-800">
          <img
            src={props.logoSrc}
            alt="alt placeholder"
            className="w-8 h-8 -mt-1 inline mx-auto"
          />
        </span>
        <span className="px-2 py-1 cursor-pointer bg-gray-200 hover:text-gray-700 text-sm rounded mb-5">
          <i className="w-8 fa fa-th-list	p-2 bg-gray-200 rounded-full" />
          <span className="mx-1">{lang('Navbar.component.dashboard')}</span>
        </span>
        <span className="px-1 cursor-pointer hover:text-gray-700">
          <i className="fa fa-cloud-upload p-2 bg-gray-200 rounded-full" />
        </span>
        <span className="px-1 cursor-pointer hover:text-gray-700">
          <i className="w-8 fa fa-plug p-2 bg-gray-200 rounded-full" />
        </span>
        <span className="px-1 cursor-pointer hover:text-gray-700">
          <i className="w-8 fa fa-database p-2 bg-gray-200 rounded-full" />
        </span>
        <span className="px-1 cursor-pointer hover:text-gray-700">
          <i className="w-8 fa fa-sticky-note	p-2 bg-gray-200 rounded-full" />
        </span>
        <span className="px-1 float-right mr-3 cursor-pointer hover:text-gray-700">
          <p className="text-gray-700 text-sm mt-2">
            {lang('Navbar.component.team.hello')}
          </p>
        </span>
      </div>
    </div>
  );
}

NavbarComponent.propTypes = {
  logoSrc: PropTypes.string.isRequired,
};

export default withNamespaces()(NavbarComponent);
