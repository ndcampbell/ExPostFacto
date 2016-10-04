// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var MainGrid = require('./MainGrid.jsx');
var ButtonCreateCard = require('./buttonCreateCard.jsx');

var Card = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Card!</h1>
        <MainGrid />
        <ButtonCreateCard />
      </div>
    );
  }
});

ReactDOM.render(<Card />,
  document.getElementById('example')
);
