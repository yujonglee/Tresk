import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux_module/store';
import App from './App';

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app'),
);
