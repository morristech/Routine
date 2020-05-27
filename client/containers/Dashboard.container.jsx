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
import WrapperHocComponent from './Wrapper.container';

function DashboardContainer(props) {
  /* @props */
  const { t: lang, history } = props;

  return (
    <Fragment>
      <div className="m-12 p-10 border-2 border-dashed">
        <p className="font-normal text-gray-500 text-center text-xl">
          <i className="fa fa-star-o" />
          {lang('Navbar.container.started.templates')}
        </p>
      </div>
    </Fragment>
  );
}

DashboardContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default WrapperHocComponent(withNamespaces()(DashboardContainer));
