import React from 'react';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
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
        .post("http://localhost:3001/api/card/vote", voteInfo)
        .then(function(result) {
            console.log(voteInfo)
            });
  },
  render: function () {
    if (this.props.showVotes) {
        return(
            <Chip>
              <Avatar size={32} color="#444" icon={<ActionGrade />}>
              </Avatar>
              {this.props.votes}
            </Chip>
        )
    } else {
        return (
          <IconButton
            tooltip={this.state.tooltip}
            onClick={this.toggleVote}
              >
            <ActionGrade color={this.state.iconColor} />
          </IconButton>
        );
    }
  }
});

module.exports = VoteButton;
