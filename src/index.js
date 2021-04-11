import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import Timer from './modules/pomodoroClock';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <Timer />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
