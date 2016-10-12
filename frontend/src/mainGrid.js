import React from 'react';
import CreateCardButton from './createCardButton.js';

import Cards from './card.js';
import HeaderBar from './headerMenu.js';

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
      <div>
        <HeaderBar />
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2>What went well?</h2></center>
              <br />
              <Cards cardColumn={1}/>
              <CreateCardButton cardColumn={1}/>
          </div>
          <div style={styles.divRight}>
            <center><h2>What didn't go well?</h2></center>
              <br />
              <Cards cardColumn={2}/>
              <CreateCardButton cardColumn={2}/>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = MainGrid;
