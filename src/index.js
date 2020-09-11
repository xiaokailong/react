import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './assets/css/index.css';
import './event-bus' // load events
import Layout from './layout';
import {Provider} from 'react-redux';
import store from './store/reducers';    // redux-thunk
// import store from './storeSaga/reducers';    // redux-saga
import * as serviceWorker from './serviceWorker';
// import { ConfigProvider } from 'antd';

function App(){
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  )
}

ReactDOM.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
