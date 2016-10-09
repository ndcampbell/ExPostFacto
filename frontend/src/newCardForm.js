import React from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';

var NewCardForm = React.createClass({
  handleSubmit: function() {
    var newTitle = ReactDOM.findDOMNode(this.refs.title).value;
    var newDesc = ReactDOM.findDOMNode(this.refs.description).value;
    var newCard = { title: newTitle, description: newDesc };
    this.serverRequest =
      axios
        .post("http://localhost:3001/cards", newCard,
        {"Content-Type": "application/json"})
        .then(function(result) {
            console.log(newCard)
            });
  },
  render: function () {
      return(
        <form>
          <FormGroup controlId="newCardTitle">
            <ControlLabel>Title</ControlLabel>
            <FormControl type="text" placeholder="Title" ref='title'/>
          </FormGroup>
          <FormGroup controlId="newCardDescription">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" ref='description'/>
          </FormGroup>
            <Button
              type="submit"
              onClick={this.handleSubmit}
            >
            Submit
            </Button>
        </form>
      );
  }
});

module.exports = NewCardForm;
