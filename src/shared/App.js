// @flow
/* eslint-disable react/prop-types */
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

// Store
import { hello } from './store/app/actions';

// Components
import Home from './containers/Home';

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
      <h1>Hello World</h1>
      <p>state: {JSON.stringify(state)}</p>
      <Home />
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
