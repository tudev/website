/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions');

var About = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('About');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = About;