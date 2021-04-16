import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { SnackbarProvider } from 'notistack';

import store from 'store/store';

import App from './App';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider maxSnack={4}>
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
