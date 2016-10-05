import React from 'react';
import { Button } from 'react-bootstrap';

var CreateCardButton = React.createClass({
    render: function() {
        return (
                <div className="createcardbutton">
                  <Button bsStyle="primary">Create Card</Button>
                </div>
        );
    }
});

module.exports = CreateCardButton;
