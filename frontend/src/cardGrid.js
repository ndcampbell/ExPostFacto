import React from 'react';
import CreateCardButton from './createCardButton.js';

import Cards from './card.js';
import HeaderBar from './headerMenu.js';

var CardGrid = React.createClass({
  render: function() {
    const styles = {
      divWrap: {
        width: '1200px',
        margin: '0 auto',
      },
      divLeft: {
        float: 'left',
        width: '580px',
      },
      divRight: {
        float: 'right',
        width: '580px',
      }
    }
    return (
      <div>
        <HeaderBar boardName={this.props.params.boardname}/>
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2>What went well?</h2></center>
              <br />
              <Cards cardColumn={1} boardId={this.props.params.id}/>
              <CreateCardButton
                  cardColumn={1}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divRight}>
            <center><h2>What didn't go well?</h2></center>
              <br />
              <Cards cardColumn={2} boardId={this.props.params.id}/>
              <CreateCardButton
                  cardColumn={2}
                  boardId={this.props.params.id}/>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = CardGrid;
