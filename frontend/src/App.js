import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MapPage from './components/MapPage';
import ClientPage from './components/ClientPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </ Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
          <Route path="/client">
            <ClientPage />
          </Route>
        </Switch>
    </Router>
  );
}


export default App;
