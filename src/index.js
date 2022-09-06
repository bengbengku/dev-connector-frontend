import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import { theme } from './chakra/chakraTheme';
import rootReducer from './reducers';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
const store = createStore(rootReducer, composeWithDevTools());

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <Router>
      <ColorModeScript />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Router>
  </Provider>
);

serviceWorker.unregister();

reportWebVitals();
