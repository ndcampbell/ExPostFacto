import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import axios from 'axios';

var EPFCard = React.createClass({
  getInitialState() {
    return { starType: 'star-empty'};
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
      const desc = (<p>{ this.props.desc }</p>);
      return (
          <div>
            <Card>
              <CardHeader
                title={title}
              />
              <CardText>{desc}</CardText>
                <CardActions>
                  <IconButton onClick={this.onDelete}><ActionDeleteForever /></IconButton>
            </CardActions>
          </Card>
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
      return (<EPFCard key={card.id} cardId={card.id} title={card.title} desc={card.description}/>);
    });
    return (
      <div>
        {cardMap}
      </div>
    );
  }
});

module.exports = Cards;
