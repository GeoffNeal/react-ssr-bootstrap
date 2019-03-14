import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import createHistory from './history';
import reducer from './app/reducer';

const history = createHistory();

const rootReducer = combineReducers({
  app: reducer,
  router: connectRouter(history),
});

export default rootReducer;
