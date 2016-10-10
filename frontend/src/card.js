import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import axios from 'axios';

import NewCardForm from './newCardForm.js';

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
          url: 'http://localhost:3001/cards',
          data: deleteData
        });
  },
  render: function() {
      const title = (<h3>{this.props.title}</h3>);
      const desc = (<p>{ this.props.description }</p>);
      return (
          <div>
            <Card>
              <CardHeader
                title={title}
              />
              <CardText>{desc}</CardText>
                <CardActions>
                  <IconButton
                    tooltip="Edit Card"
                    onClick={this.openEdit}
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
            </CardActions>
          </Card>
          <Dialog
            title="Create New Card"
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.closeEdit}
            >
            <NewCardForm
              title={this.props.title}
              description={this.props.description}
              cardId={this.props.cardId}
              editCard={true}
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
    var _this = this;
    this.serverRequest =
      axios
        .get("http://localhost:3001/cards")
        .then(function(result) {
          _this.setState({
              cardsData: result.data
            });
          console.log(result.data);
      });
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    setInterval(this.loadCardsFromServer, 2000);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function () {
    var cardMap = this.state.cardsData.map(function(card) {
      return (<EPFCard key={card.id} cardId={card.id} title={card.title} description={card.description}/>);
    });
    return (
      <div>
        {cardMap}
      </div>
    );
  }
});

module.exports = Cards;
