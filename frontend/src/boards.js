import React from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import axios from 'axios';
import { browserHistory } from 'react-router'

const styles = {
  board: {
    height: "100%",
    width: "30%",
    margin: "1%",
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
    float: 'left',
    wordBreak: 'break-word',
    position: 'relative'
  },
  boardLink: {
    display: 'block',
    height: '100%',
    width: '100%',
    textDecoration: 'none',
  },
  buttonDiv: {
    bottom: '0',
    width: '100%',
    position: 'absolute'
  }
};

var Board = React.createClass({
  onDelete() {
    var deleteData = {id: this.props.boardId};
    this.serverRequest =
      axios({
          method: 'delete',
          url: 'http://localhost:3001/api/boards',
          data: deleteData
        });
  },
  render: function() {
      const boardUrl = '/board/' + this.props.boardId + '/' + this.props.name;
      return (
        <div style={styles.board}>
            <Paper style={{height: '120px'}} zDepth={2} >
              <div onClick={function(){browserHistory.push(boardUrl)}} style={styles.boardLink}>
                  <h1>{this.props.name}</h1>
              </div>
              <div style={styles.buttonDiv}>
                  <IconButton
                    onClick={this.onDelete}
                    tooltip="Delete Board"
                    tooltipPosition="top-center"
                    style={{float: 'right'}}
                    >
                    <ActionDeleteForever />
                  </IconButton>
              </div>
              </Paper>
            </div>
      );
  }
});

var Boards = React.createClass({
  getInitialState: function() {
    return {boardsData: []};
  },
  loadBoardsFromServer: function() {
    var url = ("http://localhost:3001/api/boards");
    var _this = this;
    this.serverRequest =
      axios
        .get(url)
        .then(function(result) {
            console.log(result.data);
          _this.setState({
              boardsData: result.data
            });
      });
  },
  componentDidMount: function() {
    this.loadBoardsFromServer();
    setInterval(this.loadBoardsFromServer, 500);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function () {
    var boardsMap = this.state.boardsData.map(function(board) {
      return (<Board key={board.id} boardId={board.id} name={board.name}/>);
    });
    return (
      <div>
        {boardsMap}
      </div>
    );
  }
});

module.exports = Boards;
