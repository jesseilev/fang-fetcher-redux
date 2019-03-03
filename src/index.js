import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import * as Loop from 'redux-loop';

import './index.css';
import * as App from './Containers/App';
import { rootReducer, initialState } from './reducers';


const middleware = compose(
  Loop.install(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
const store = createStore(rootReducer, initialState, middleware);


ReactDOM.render(
  <Provider store={store}>
    <App.View />
  </Provider>,
  document.getElementById('root')
);


store.subscribe( () => {
  console.log(store.getState());
});