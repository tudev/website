/** @jsx React.DOM */
var React           = require('react');

var Actions         = require('../../actions'),
    AuthService     = require('../../services/auth'),
    UIStateStore    = require('../../stores/uistate')
    Header          = require('./header'),
    Footer          = require('./footer');

var PublicPageWrapper = React.createClass({
    componentDidMount: function() {
        // Get the session immediately
        AuthService.getSession(function(err, res) {
            if (err) {
                // TODO create mechanism to report network problems
                console.log('Could not get session', err);
            } else {
                Actions.declareSessionDataLoaded(res.body);
            }
        });
    },
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