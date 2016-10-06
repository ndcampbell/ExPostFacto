import React from 'react';

const styles = {
  cardDiv: {
    padding: '20px',
    margin: '20px',
    backgroundColor: 'green',
    borderRadius: '15px'
  }
};

var Card = React.createClass({
  render: function() {
      return (
          <div style={ styles.cardDiv }>
          <h1>Card Title!</h1>
          <p>This is some card content</p>
          </div>
      );
  }
});

module.exports = Card;
