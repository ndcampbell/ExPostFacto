import React from 'react';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel } from 'react-bootstrap';

var NewCardForm = React.createClass({
  render: function () {
      return(
        <Form horizontal>
          <FormGroup controlId="formHorizontaTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Title
            </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="Card Title" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontaDesc">
            <Col componentClass={ControlLabel} sm={2}>
              Description
            </Col>
          <Col sm={10}>
            <FormControl type="textarea" placeholder="Card Description" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">
              submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
      );
  }
});

module.exports = NewCardForm;
