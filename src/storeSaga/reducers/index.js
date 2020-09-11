import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSaga from 'redux-saga'
import homeReducer from './home';
import userReducer from './user';
import RootSaga from '../saga';

let saga = createSaga();

let store = createStore(combineReducers({
  home: homeReducer,
  user: userReducer,
}), applyMiddleware(saga))

saga.run(RootSaga);

export default store;
