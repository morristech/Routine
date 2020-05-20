/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import DashboardContainer from './containers/Dashboard.container';
import CreateSandboxContainer from './containers/CreateSandbox.container';
import ApplyTemplateContainer from './containers/ApplyTemplate.container';
import BuildSandboxContainer from './containers/BuildSandbox.container';
import ImportTemplateContainer from './containers/ImportTemplate.container';

/**
 * @desc Define routes.
 * @warn Each route should map to a component.
 * @exports
 */
export const Routes = [{
    id: '#CreateSandbox',
    path: '/create/sandbox',
    component: CreateSandboxContainer,
  },
  {
    id: '#TemplateSandbox',
    path: '/sandbox/template',
    component: ApplyTemplateContainer,
  },
  {
    id: '#BuildSandbox',
    path: '/sandbox/build',
    component: BuildSandboxContainer
  },
  {
    id: '#Dashboard',
    path: '/dashboard',
    component: DashboardContainer
  },
  {
    id: '#Import',
    path: '/import/template',
    component: ImportTemplateContainer
  }
];
