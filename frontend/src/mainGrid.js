import React from 'react';
import CreateCardButton from './createCardButton.js';
import Cards from './card.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var MainGrid = React.createClass({
  render: function() {
    const styles = {
      divWrap: {
        width: '1000px',
        margin: '0 auto',
      },
      divLeft: {
        float: 'left',
        width: '480px',
      },
      divRight: {
        float: 'right',
        width: '480px',
      }
    }
    return (
      <MuiThemeProvider>
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2>What went well?</h2></center>
              <br />
              <Cards />
              <CreateCardButton cardcol={1}/>
          </div>
          <div style={styles.divRight}>
            <center><h2>What didn't go well?</h2></center>
              <br />
              <Cards />
              <CreateCardButton cardcol={1}/>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
});

module.exports = MainGrid;
