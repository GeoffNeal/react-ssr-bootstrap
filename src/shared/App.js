/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';

// Router
import { Route } from 'react-router-dom';

// Store
import { connect } from 'react-redux';
import { hello } from './store/app/actions';

// Containers
import Home from './containers/Home';
import About from './containers/About';
import Search from './containers/Search';

// Components
import Navigation from './components/Navigation';

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
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/search" component={Search} />

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
