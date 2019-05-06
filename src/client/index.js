/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// Components
import App from '../shared/App';

// Store
import { configureStore } from '../shared/store';
import createHistory from '../shared/store/history';

const history = createHistory();

// Create/use the store.
// history MUST be passed here if you want
// syncing between server on initial route.
const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
    history,
  });

ReactDOM.hydrate(
  <Provider store={store}>
    <Router history={history}>
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
