import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import CreateCardButton from './createCardButton.js';

const styles = {
    leftSide: {
      height: '100%'
    },
    rightSide: {
      backgroundColor: 'red',
      height: '100%'
    }
  };

var MainGrid = React.createClass({
    render: function() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={6} style={ styles.leftSide }>
                        <center><h2>What went well?</h2></center>
                        <CreateCardButton />
                    </Col>
                    <Col xs={6} md={6} style={ styles.rightSide }>
                        <center><h2>What didn't go well?</h2></center>
                        <CreateCardButton />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = MainGrid;
