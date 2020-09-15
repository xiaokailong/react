import {createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer } from 'react-router-redux'
// import {combineReducers} from 'redux-immutable';
import thunk from 'redux-thunk';
import homeReducer from './home';
import userReducer from './user';

let store = createStore(combineReducers({
  router: routerReducer,
  home: homeReducer,
  user: userReducer,
}), applyMiddleware(thunk))

export default store;
