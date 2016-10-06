import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import NewCardForm from './newCardForm.js';

const styles = {
      container: {
        textAlign: 'center',
        padding: '20px',
        bottom: '50px',
      }
};

var CreateCardButton = React.createClass({
    getInitialState() {
      return { showModal: false };
    },
    close() {
      this.setState({ showModal: false });
    },
    open() {
        this.setState({ showModal: true });
      },
    render: function() {
        return (
                <div style={ styles.container }>
                  <Button
                    bsStyle="primary"
                    className="btn center-block"
                    onClick={this.open}>
                    Create Card
                  </Button>
                 <Modal show={this.state.showModal} onHide={this.close}>
                   <Modal.Header closeButton>
                     <Modal.Title>Create New Card</Modal.Title>
                   </Modal.Header>
                   <Modal.Body>
                     <NewCardForm />
                   </Modal.Body>
                   <Modal.Footer>
                   </Modal.Footer>
                 </Modal>
                </div>
        );
    }
});

module.exports = CreateCardButton;
