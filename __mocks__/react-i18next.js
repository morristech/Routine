/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

jest.mock('react-i18next', () => ({
  withNamespaces: () => (Component) => {
    Component.defaultProps = {
      ...Component.defaultProps,
      t: (key) => key,
    };
    return Component;
  },
}));
