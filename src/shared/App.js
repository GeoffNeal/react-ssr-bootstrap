/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';

// Router
import { Route, Switch } from 'react-router-dom';

// Components
import Navigation from 'Components/Navigation';

// Containers
import Home from 'Containers/Home';
import About from 'Containers/About';
import Search from 'Containers/Search';
import NotFound from 'Containers/NotFound';

// Config
import navLinks from 'Config/app/nav-links';

// Styles
import './index.scss';

const App = () => (
  <div>
    <Helmet defaultTitle="spaceplace.com" titleTemplate="%s | spaceplace.com" />
    <Navigation items={navLinks} />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
