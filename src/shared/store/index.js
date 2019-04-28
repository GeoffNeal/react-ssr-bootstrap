import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

export const configureStore = ({ initialState, middleware = [] } = {}) => {
  /* eslint-disable no-underscore-dangle */
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });
  /* eslint-enable */

  const composeEnhancers = devtools || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware))),
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./rootReducer', () => {
        /* eslint-disable-next-line global-require */
        store.replaceReducer(require('./rootReducer').default);
      });
    }
  }

  return store;
};

export default configureStore;
