import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import Canvas from './components/Canvas';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Canvas />
    <Main />
  </Provider>,
  document.getElementById('app')
);
