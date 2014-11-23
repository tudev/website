/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions');

var Team = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Team');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = Team;