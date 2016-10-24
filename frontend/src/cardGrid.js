import React from 'react';
import CreateCardButton from './createCardButton.js';
import Toggle from 'material-ui/Toggle';

import Cards from './card.js';
import HeaderBar from './headerMenu.js';

const styles = {
  divWrap: {
    width: '1200px',
    margin: '0 auto',
  },
  divLeft: {
    float: 'left',
    width: '580px',
  },
  divRight: {
    float: 'right',
    width: '580px',
  },
  divToggle: {
      width: '150px',
      position: 'absolute',
      height: '10px',
      margin: '25px'
  }
 }

var CardGrid = React.createClass({
  getInitialState() {
      return { showVotes: false};
  },
  onToggle: function() {
    if (this.state.showVotes) {
        this.setState({showVotes: false})
    } else {
        this.setState({showVotes: true})
    }
  },
  render: function() {
    return (
      <div>
        <HeaderBar boardName={this.props.params.boardname}/>
        <div style={styles.divToggle}>
            <Toggle
                label="Show Votes"
                onToggle={this.onToggle}
            />
        </div>
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2>What went well?</h2></center>
              <br />
              <Cards cardColumn={1}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  cardColumn={1}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divRight}>
            <center><h2>What didn't go well?</h2></center>
              <br />
              <Cards cardColumn={2}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  cardColumn={2}
                  boardId={this.props.params.id}/>
          </div>
        </div>
      </div>
    );
  }
});


module.exports = CardGrid;
