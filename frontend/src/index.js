import React from 'react';
import ReactDOM from 'react-dom';
import MainGrid from './mainGrid.js';
import './index.css';

var Card = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Card!</h1>
        <MainGrid />
      </div>
    );
  }
});

ReactDOM.render(<Card />,
  document.getElementById('root')
);

