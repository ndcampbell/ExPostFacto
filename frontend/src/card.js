import React from 'react';
import {Card, CardActions, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import axios from 'axios';

import NewCardForm from './newCardForm.js';
import VoteButton from './voteButton.js';

const styles = {
    card: {
        width: "45%",
        height: "100%",
        margin: "2%",
        display: "inline-block",
        verticalAlign: "top",
        position: 'relative',
        whiteSpace: 'pre-wrap',
    },
    indCard: {
        height: "200px"
    },
    cardActions: {
        position: "absolute",
        bottom: '0',
        width: '100%'
    },
    voteDiv: {
        width: '50px',
        margin: '0 auto'
    },
    form: {
        margin: '0 auto',
        width: '30%'
    }
}

var EPFCard = React.createClass({
  getInitialState() {
    return { starType: 'star-empty',
              showDialog: false };
  },
  closeEdit() {
    this.setState({ showDialog: false });
  },
  openEdit() {
      this.setState({ showDialog: true });
    },
  toggleVote() {
    if (this.state.starType === "star-empty") {
      this.setState({ starType: 'star' });
    } else {
      this.setState({ starType: 'star-empty' });
    }
  },
  onDelete() {
    var deleteData = {id: this.props.cardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/api/cards',
          data: deleteData
        });
  },
  render: function() {
      const title = (<h3>{this.props.title}</h3>);
      return (
          <div style={styles.card}>
            <Card style={styles.indCard}>
              <CardText>{title}</CardText>
                <CardActions style={styles.cardActions}>
                  <div>
                      <IconButton
                        tooltip="Edit Card"
                        onClick={this.openEdit}
                        style={{float: 'left'}}
                        >
                        <ModeEdit />
                      </IconButton>
                      <IconButton
                        onClick={this.onDelete}
                        tooltip="Delete Card"
                        style={{float: 'right'}}
                        >
                        <ActionDeleteForever />
                      </IconButton>
                      <div style={styles.voteDiv}>
                          <VoteButton
                              cardId={this.props.cardId}
                              votes={this.props.votes}
                              showVotes={this.props.showVotes}
                          />
                      </div>
                  </div>
            </CardActions>
          </Card>
          <Dialog
            contentStyle={styles.form}
            title="Edit Card"
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.closeEdit}
            >
            <NewCardForm
              title={this.props.title}
              description={this.props.description}
              cardId={this.props.cardId}
              editCard={true}
              closeDialog={this.closeEdit}
            />
          </Dialog>
        </div>
      );
  }
});

var Cards = React.createClass({
  getInitialState: function() {
    return {cardsData: []};
  },
    loadCardsFromServer: function() {
    var url = ("http://localhost:3001/api/cards/?columnid=" + this.props.cardColumn + "&boardid=" + this.props.boardId);
    console.log(url);
    var _this = this;
    this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
          _this.setState({
              cardsData: result.data
            });
      });
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, 500);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function () {
    var showVotes = this.props.showVotes
    var cardMap = this.state.cardsData.map(function(card) {
      return (<EPFCard
                  key={card.id}
                  cardId={card.id}
                  title={card.title}
                  description={card.description}
                  votes={card.votes}
                  showVotes={showVotes}/>);
    });
    return (
      <div>
        {cardMap}
        <div style={{height: '150px'}}></div>
      </div>
    );
  }
});

module.exports = Cards;
