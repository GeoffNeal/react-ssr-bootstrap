/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  ConnectedRouter as Router,
  routerMiddleware,
} from 'connected-react-router';

// Components
import App from '../shared/App';

// Store
import { configureStore } from '../shared/store';
import createHistory from '../shared/store/history';

const browserHistory = createHistory();
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(browserHistory)],
  });

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store) {
    window.store = store;
  }
}
