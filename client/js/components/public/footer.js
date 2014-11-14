/** @jsx React.DOM */
var React   = require('react');

var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <span>Made with <i className="fa fa-heart"></i> in Philadelphia</span>
            </footer>
        );
    }
});

module.exports = Footer;