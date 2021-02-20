import React from 'react';
import {Switch, Route} from "react-router-dom";
import Settings from "../pages/Settings";

import Home from "../pages/Home";

export default function Routes(props) {
  const {user} = props;
  
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/artist" exact>
        <h1>Artistas</h1>
      </Route>
      <Route path="/settings" exact>
        <Settings user={user} />
      </Route>
    </Switch>
  )
}
