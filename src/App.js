import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './LandingPage/Home/Home';

const App =()=> {
  return (
    <div>
        <BrowserRouter>
                <Switch>
                  <Route exact path="/" component={Home} />
                </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
