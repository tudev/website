/** @jsx React.DOM */
var React   = require('react');

var Header  = require('./header'),
    Footer  = require('./footer');

var PublicPageWrapper = React.createClass({
    render: function() {
        return (
            <div id="public">
                <Header/>
                <div id="content">
                    <this.props.activeRouteHandler/>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = PublicPageWrapper;