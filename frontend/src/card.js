import React from 'react';
import {Button, Panel, Glyphicon} from 'react-bootstrap';
//import 'whatwg-fetch';
import axios from 'axios';

var Card = React.createClass({
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
  render: function() {
      const title = (<h3>{this.props.title}</h3>);
      const desc = (<p>{ this.props.desc }</p>);
      return (
          <div>
          <Panel header={title} bsStyle="primary">
            {desc}
            <Button
              bsSize="small"
              className="btn center-block"
              onClick={this.toggleVote}
              >
              <Glyphicon glyph={this.state.starType}/> Vote
            </Button>
          </Panel>
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
        .get("http://localhost:3001/")
        .then(function(result) {
          _this.setState({
              cardsData: result.data
            });
          console.log(result.data);
      });
  },
  componentDidMount: function() {
    this.loadCardsFromServer();
    //setInterval(this.loadCardsFromServer, 2000);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function () {
    var cardMap = this.state.cardsData.map(function(card) {
      return (<Card title={card.title} desc={card.description}/>);
    });
    return (
      <div>
        {cardMap}
      </div>
    );
  }
});

module.exports = Cards;
