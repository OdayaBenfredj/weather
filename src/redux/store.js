import { createStore, combineReducers, applyMiddleware } from 'redux';
import produce from 'immer';
import weathers from './reducers/weathers';
import { initHistory } from './actions'
const base = 'http://localhost:3000/api/v1.0/';

const initAllHistoryServer = ({ dispatch, getState }) => next => action => {
  if (action.type === 'LOGIN_USER') {
    console.log('initAllHistoryServer,histories')

    fetch(`${base}/history`, {
      credentials: 'include'
    }).then(async (data) => {
      const history = await data.json();
      if (data.status === 200) {
        await console.log('initAllHistoryServer,histories', history)
        await console.log('initAllHistoryServer,histories', history)
        await console.log('initAllHistoryServer,histories', history)
        await dispatch(initHistory(history))
      }
    })
  }
  return next(action);
}

const reducer = combineReducers({ weathers });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(initAllHistoryServer)));

window.store = store;
// store.dispatch({ type: "INIT_ALL_HISTORY" })
export default store;

