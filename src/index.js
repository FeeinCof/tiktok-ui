import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from '~/GlobalStyle/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GlobalStyle>
    <App />
  </GlobalStyle>,
);

reportWebVitals();
