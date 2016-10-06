import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

var NewCardForm = React.createClass({
  render: function () {
      return(
        <form>
          <FormGroup controlId="newCardTitle">
            <ControlLabel>Title</ControlLabel>
            <FormControl componentClass="text" placeholder="Title" />
          </FormGroup>
          <FormGroup controlId="newCardDesc">
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Description" />
          </FormGroup>
            <Button type="submit">Submit</Button>
        </form>
      );
  }
});

module.exports = NewCardForm;
