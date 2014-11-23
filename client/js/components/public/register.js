/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions');

var Register = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Register');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = Register;