import {createStore, combineReducers, applyMiddleware} from 'redux';
// import {combineReducers} from 'redux-immutable';
import thunk from 'redux-thunk';
import counterReducer from './counter';
import userReducer from './user';

let store = createStore(combineReducers({
  counter: counterReducer,
  user: userReducer,
}), applyMiddleware(thunk))

export default store;
