// React
import React from 'react';
import ReactDOM from 'react-dom';
// Styles
import './index.css';
// Other
import reportWebVitals from './reportWebVitals';
// Components
import App from './App';
import { StateProvider } from './components/StateProvider/StateProvider';
import reducer, { initialState } from './components/Reducer/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
