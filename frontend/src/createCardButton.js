import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
      return { showDialog: false };
    },
    close() {
      this.setState({ showDialog: false });
    },
    open() {
        this.setState({ showDialog: true });
      },
    render: function() {
        return (
                <div style={ styles.container }>
                  <FloatingActionButton onClick={this.open}>
                    <ContentAdd />
                  </FloatingActionButton>
                  <Dialog
                    title="Create New Card"
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.close}
                    >
                    <NewCardForm />
                  </Dialog>
                </div>
        );
    }
});

module.exports = CreateCardButton;
