/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import { createContext } from 'react';

/**
 * Global shared state.
 *
 * @type {object}
 * @var initState
 */
export const initState = {
  appName: null,
  folderPath: null,
  vcs: null,
};

export const CreateSandboxContext = createContext();
