import React from 'react';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {yellow700} from 'material-ui/styles/colors';
import axios from 'axios';


var VoteButton = React.createClass({
  getInitialState() {
      return { tooltip: "Vote",
               voted: false,
               iconColor: null};
  },
  toggleVote() {
    if (!this.state.voted) {
        this.setState({tooltip: "Unvote",
                       voted: true,
                       iconColor: yellow700
      });
      this.addremoveVote(true);
    } else {
        this.setState({tooltip: "Vote",
                       voted: false,
                       iconColor: null
      });
      this.addremoveVote(false);
    }
  },
  addremoveVote(voted) {
    var voteInfo = {cardId: this.props.cardId, voted: voted};
    this.serverRequest =
      axios
        .post("http://localhost:3001/card/vote", voteInfo)
        .then(function(result) {
            console.log(voteInfo)
            });
  },
  render: function () {
    return (
      <IconButton
        tooltip={this.state.tooltip}
        onClick={this.toggleVote}
      >
        <ActionGrade color={this.state.iconColor} />
      </IconButton>
    );
  }
});

module.exports = VoteButton;
