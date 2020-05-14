/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes';
import '../configuration/i18n';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {Routes.map(({ id, path, component }) => {
          return <Route key={id} exact path={path} component={component} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
