import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { BrowserRouter } from 'react-router-dom';

import store from './redux_module/store';
import palette from './color';
import App from './App';

const persistor = persistStore(store);

const theme = createMuiTheme({
  palette,
  // fontFamily: font,
});

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  ),
  document.getElementById('app'),
);
