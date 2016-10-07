import React from 'react';
import ReactDOM from 'react-dom';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

var NewCardForm = React.createClass({
  handleSubmit: function() {
    console.log(ReactDOM.findDOMNode(this.refs.title).value);
    //var newTitle = ReactDOM.findDOMNode(this.refs.title).value;
    //var newDesc = ReactDOM.findDOMNode(this.refs.description).value;
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
