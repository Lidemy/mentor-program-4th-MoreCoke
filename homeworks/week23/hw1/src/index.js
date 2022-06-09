import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';

import store from './store';
import './index.css';
import { ResetStyle } from './components/globalStyle';
import TodoList from './views/TodoList';

ReactDOM.render(
  <React.StrictMode>
    <ResetStyle />
    <Provider store={store}>
      <TodoList />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
