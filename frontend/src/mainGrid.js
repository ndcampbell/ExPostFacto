import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import CreateCardButton from './createCardButton.js';

var MainGrid = React.createClass({
    render: function() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <center><h2>What went well?</h2></center>
                        <CreateCardButton />
                    </Col>
                    <Col xs={6} md={6}>
                        <center><h2>What didn't go well?</h2></center>
                        <CreateCardButton />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = MainGrid;
