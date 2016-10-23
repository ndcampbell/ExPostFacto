import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewCardForm from './newCardForm.js';

const styles = {
      container: {
        textAlign: 'center',
        margin: '0 auto',
        //padding: '20px',
        width: '570px',
        bottom: '50px',
        position: 'fixed',
    },
    form: {
        margin: '0 auto',
        width: '30%'
    }
};

var CreateCardButton = React.createClass({
    getInitialState() {
      return { showDialog: false };
    },
    close: function() {
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
                    contentStyle={styles.form}
                    title="Create New Card"
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.close}
                    >
                    <NewCardForm
                        cardColumn={this.props.cardColumn}
                        boardId={this.props.boardId}
                        closeDialog={this.close}
                    />
                  </Dialog>
                </div>
        );
    }
});

module.exports = CreateCardButton;
