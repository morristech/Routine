/*
 * This file is part of the Routine project.
 *
 * (c) Yasser Ameur El Idrissi <getspookydev@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React, { useState } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { CreateSandboxContext, initState } from './SandboxContext';
import { Routes } from './Routes';
import '../configuration/i18n';

function App() {
  /** @state **/
  const [data, setData] = useState(initState);

  return (
    <BrowserRouter>
      <Switch>
        <CreateSandboxContext.Provider value={{ data, setData }}>
          {Routes.map(({ id, path, component }) => {
            return <Route key={id} exact path={path} component={component} />;
          })}
        </CreateSandboxContext.Provider>
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
