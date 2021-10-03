import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import Login from './login'
import MainApp from './mainApp'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from "react-router-dom";
import AppRouter from './router';

const App = (props) => {
  return (
    <Provider store={store}>
      <div className='app'>
        <AppRouter />
        {/* <MainApp></MainApp> */}
      </div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.querySelector('main'));
