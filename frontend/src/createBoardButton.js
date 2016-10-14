import React from 'react';
import Dialog from 'material-ui/Dialog';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewBoardForm from './newBoardForm.js';

const styles = {
      container: {
        textAlign: 'center',
        margin: '0 auto',
        width: '100%',
        bottom: '50px',
        position: 'fixed',
      }
};

var CreateBoardButton = React.createClass({
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
                  <FloatingActionButton onClick={this.open} tooltip="Create Board">
                    <ContentAdd />
                  </FloatingActionButton>
                  <Dialog
                    title="Create New Board"
                    modal={false}
                    open={this.state.showDialog}
                    onRequestClose={this.close}
                    >
                    <NewBoardForm />
                  </Dialog>
                </div>
        );
    }
});

module.exports = CreateBoardButton;
