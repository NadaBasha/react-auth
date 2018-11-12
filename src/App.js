import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from './components/navBar';
import Shapes from './components/shapes';
import Users from './components/users';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/users" component={Users} />
            <Route path="/shapes" component={Shapes} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/users" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
