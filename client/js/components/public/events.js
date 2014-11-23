/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions');

var Events = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Events');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = Events;