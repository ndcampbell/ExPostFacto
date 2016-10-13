import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import axios from 'axios';

const styles = {
  board: {
    height: "100%",
    width: "30%",
    margin: "1%",
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
    float: 'left',
  },
  boardLink: {
    display: 'block',
    height: '100%',
    width: '100%',
    textDecoration: 'none',
  }
};

var Board = React.createClass({
  onDelete() {
    var deleteData = {id: this.props.boardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/boards',
          data: deleteData
        });
  },
  render: function() {
      return (
        <div onClick="" style={styles.board}>
            <Paper style={{height: '150px'}} zDepth={2} >
              <h3>{this.props.name}</h3>
                  <IconButton
                    onClick={this.onDelete}
                    tooltip="Delete Board"
                    style={{float: 'right'}}
                    >
                    <ActionDeleteForever />
                  </IconButton>
              </Paper>
            </div>
      );
  }
});

var Cards = React.createClass({
  getInitialState: function() {
    return {cardsData: []};
  },
    loadCardsFromServer: function() {
    var url = ("http://localhost:3001/cards/?columnid=" + this.props.cardColumn);
    console.log(url);
    var _this = this;
    this.serverRequest =
      axios
        .get(url)
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
        <div style={{height: '150px'}}></div>
      </div>
    );
  }
});

module.exports = Board;
