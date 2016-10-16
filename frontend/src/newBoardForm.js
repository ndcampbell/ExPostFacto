import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

var NewBoardForm = React.createClass({
  getInitialState() {
    return { name: this.props.name || ''}
  },
  _handleNameChange: function(e) {
    this.setState({
        name: e.target.value
    });
  },
  handleSubmit: function() {
    var newBoard
    newBoard = { name: this.state.name };
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/boards", newBoard)
        .then(function(result) {
            console.log(newBoard)
            });
    this.props.closeDialog()
  },
  render: function () {
      return(
        <form>
          <TextField
            floatingLabelText="Board Name"
            defaultValue={this.props.name}
            onChange={this._handleNameChange}
            fullWidth={true}
          />
        <RaisedButton label="Submit"
          primary={true}
          onClick={this.handleSubmit}
        />
        </form>
      );
  }
});

module.exports = NewBoardForm;
