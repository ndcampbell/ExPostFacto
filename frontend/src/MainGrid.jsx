var React = require('react')
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col
var ButtonCreateCard = require('./buttonCreateCard.jsx');

var MainGrid = React.createClass({
    render: function() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <center><h2>What went well?</h2></center>
                        <ButtonCreateCard />
                    </Col>
                    <Col xs={6} md={6}>
                        <center><h2>What didn't go well?</h2></center>
                        <ButtonCreateCard />
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = MainGrid;
