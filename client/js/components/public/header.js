/** @jsx React.DOM */
var React   = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <div id="logo"></div>
            </header>
        );
    }
});

module.exports = Header;