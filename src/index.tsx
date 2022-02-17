import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from 'styles/GlobalStyle';
import Router from 'Router';

import store from 'redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Router />
  </Provider>,
  document.getElementById('root'),
);
