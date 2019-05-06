import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reducer from './app/reducer';

const createRootReducer = history =>
  combineReducers({
    app: reducer,
    router: connectRouter(history),
  });

export default createRootReducer;
