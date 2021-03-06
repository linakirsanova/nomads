import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Map from './containers/Map';

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

render(
  <Provider store={store}>
    < Map />
  </Provider>,
  document.getElementById('root')
);