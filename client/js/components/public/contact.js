/** @jsx React.DOM */
var React       = require('react');

var Actions     = require('../../actions');

var Contact = React.createClass({
    componentDidMount: function() {
        Actions.changePageTitle('Contact');
    },
    render: function() {
        return (
            <div></div>
        );
    }
});

module.exports = Contact;