import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import CardGrid from './cardGrid.js';
import BoardGrid from './boardGrid.js';
import './index.css';

injectTapEventPlugin();

var MainPage = React.createClass({
  render: function() {
    return(
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/board/:id" component={CardGrid}/>
        <Route path="/boards" component={BoardGrid}/>
        <Route path="*" component={BoardGrid}/>
      </Router>
    </MuiThemeProvider>
  );
  }
});

ReactDOM.render(<MainPage />,
  document.getElementById('root')
);
