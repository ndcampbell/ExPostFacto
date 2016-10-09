import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

var NewCardForm = React.createClass({
  getInitialState() {
    return { titleValue: '',
             descValue: ''};
  },
  _handleTitleChange: function(e) {
    this.setState({
        titleValue: e.target.value
    });
  },
_handleDescChange: function(e) {
    this.setState({
        descValue: e.target.value
    });
  },
  handleSubmit: function() {
    var newCard = { title: this.state.titleValue, description: this.state.descValue };
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
          <TextField
            floatingLabelText="Title"
            defaultValue={this.state.titleValue}
            onChange={this._handleTitleChange}
          /><br />
          <TextField
            floatingLabelText="Description"
            defaultValue={this.state.titleDesc}
            multiLine={true}
            rows={4}
            onChange={this._handleDescChange}
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
