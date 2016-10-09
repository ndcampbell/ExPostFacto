import React from 'react';
import ReactDOM from 'react-dom';
import MainGrid from './mainGrid.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(<MainGrid />,
  document.getElementById('root')
);
