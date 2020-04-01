import React from 'react';
import ReactDOM from 'react-dom';

import { GlobalProvider as Provider } from './context/GlobalState';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
);
