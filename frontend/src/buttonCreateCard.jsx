// main.js
var React = require('react');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;

var ButtonCreateCard = React.createClass({
    render: function() {
        return (
                <div className="cardbutton">
                  <Button bsStyle="primary">Create Card</Button>
                </div>
        );
    }
});

module.exports = ButtonCreateCard;
