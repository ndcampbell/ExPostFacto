import React from 'react';
import ReactDOM from 'react-dom';
import MainGrid from './mainGrid.js';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';

injectTapEventPlugin();

var MainPage = React.createClass({
  render: function() {
    return(
    <MuiThemeProvider>
      <MainGrid />
    </MuiThemeProvider>
  );
  }
});

ReactDOM.render(<MainPage />,
  document.getElementById('root')
);
