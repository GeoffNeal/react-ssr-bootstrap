/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';

// Router
import { Route, Switch } from 'react-router-dom';

// Components
import Navigation from 'Components/Navigation';

// Store
import { connect } from 'react-redux';
import { hello } from './store/app/actions';

// Containers
import Home from './containers/Home';
import About from './containers/About';
import Search from './containers/Search';
import NotFound from './containers/NotFound';

// Styles
import './index.scss';

const App = props => {
  const { state, sayHello } = props;
  return (
    <div>
      <Helmet
        defaultTitle="spaceplace.com"
        titleTemplate="%s | spaceplace.com"
      />

      <Navigation
        items={[
          {
            href: '/',
            text: 'Home',
            attrs: { exact: true },
          },
          {
            href: '/about',
            text: 'About',
          },
          {
            href: '/search',
            text: 'Search',
          },
        ]}
      />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/search" component={Search} />
        <Route component={NotFound} />
      </Switch>

      <h1>Hello World</h1>
      <p>state: {JSON.stringify(state)}</p>
      <button type="button" onClick={sayHello}>
        Click
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    state,
  };
};

const mapDispatchToProps = {
  sayHello: hello,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
