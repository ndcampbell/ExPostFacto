import React from 'react';

import HeaderBar from './headerMenu.js';
import CreateBoardButton from './createBoardButton.js';

var BoardGrid = React.createClass({
  render: function() {
    return (
      <div>
        <HeaderBar />
        <h2><center>Boards</center></h2>
        <CreateBoardButton />
      </div>
    );
  }
});



module.exports = BoardGrid;
