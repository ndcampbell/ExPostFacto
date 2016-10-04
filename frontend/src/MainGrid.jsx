var React = require('react')
var Grid = require('react-bootstrap').Grid
var Row = require('react-bootstrap').Row
var Col = require('react-bootstrap').Col

var MainGrid = React.createClass({
    render: function() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={6} md={6}>
                        <h1>stuff</h1>
                    </Col>
                    <Col xs={6} md={6}>
                        <h2>otherstuff</h2>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = MainGrid;
