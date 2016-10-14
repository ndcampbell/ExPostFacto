import React from 'react';

import HeaderBar from './headerMenu.js';
import CreateBoardButton from './createBoardButton.js';

import Boards from './boards.js';

const styles = {
  boardDiv: {
    width: '70%',
    margin: '0 auto',
    overflow: 'hidden'
  }
}

var BoardGrid = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderBar />
        <h2><center>Boards</center></h2>
        <div style={styles.boardDiv}>
          <Boards />
        </div>
        <div style={{height: '150px'}}></div>
        <CreateBoardButton />
      </div>
    );
  }
});



module.exports = BoardGrid;
