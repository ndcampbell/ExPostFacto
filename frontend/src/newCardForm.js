import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

var NewCardForm = React.createClass({
  getInitialState() {
    return { title: this.props.title || '',
             description: this.props.description || ''};
  },
  _handleTitleChange: function(e) {
    this.setState({
        title: e.target.value
    });
  },
  _handleDescChange: function(e) {
    this.setState({
        description: e.target.value
    });
  },
  handleSubmit: function() {
    var newCard
    if (this.props.editCard) {
      newCard = { id: this.props.cardId,
          title: this.state.title, description: this.state.description };
    } else{
      newCard = { boardid: this.props.boardId, title: this.state.title, description: this.state.description, columnid: this.props.cardColumn };
    }
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/cards", newCard)
        .then(function(result) {
            console.log(newCard)
            });
    this.props.closeDialog()
  },
  render: function () {
      return(
        <form>
          <TextField
            floatingLabelText="Title"
            defaultValue={this.props.title}
            onChange={this._handleTitleChange}
            fullWidth={true}
            maxLength={250}
          /><br />
          <TextField
            floatingLabelText="Description"
            defaultValue={this.props.description}
            multiLine={true}
            rows={4}
            onChange={this._handleDescChange}
            fullWidth={true}
          /><br />
        <RaisedButton label="Submit"
          primary={true}
          onClick={this.handleSubmit}
        />
        </form>
      );
  }
});

module.exports = NewCardForm;
