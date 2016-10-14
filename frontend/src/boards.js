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
          url: 'http://localhost:3001/api/boards',
          data: deleteData
        });
  },
  render: function() {
      const boardUrl = '/board/' + this.props.boardId;
      return (
        <div onClick={function(){browserHistory.push(boardUrl)}} style={styles.board}>
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
    setInterval(this.loadBoardsFromServer, 2000);
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
