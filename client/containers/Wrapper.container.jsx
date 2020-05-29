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
import AlertComponent from '../components/Alert.component';
import NavbarComponent from '../components/Navbar.component';
import FooterComponent from '../components/Footer.component';

function WrapperHocComponent(WrappedComponent) {
  return (props) => (
    <Fragment>
      <AlertComponent />
      <NavbarComponent logoSrc={require('../icons/logo.svg')} />
      <div className="container mx-auto h-screen px-8 pt-4">
        <WrappedComponent {...props} />
      </div>
      <FooterComponent />
    </Fragment>
  );
}

WrapperHocComponent.propTypes = {
  WrappedComponent: PropTypes.element.isRequired,
};

export default WrapperHocComponent;
