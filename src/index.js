import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducer from './Store/Reducers';
import '../node_modules/font-awesome/css/font-awesome.min.css'


// const createStoreWithMiddleware = applyMiddleware()(createStore)
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
