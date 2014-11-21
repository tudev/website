/** @jsx React.DOM */
var React           = require('react');

var Actions         = require('../../actions'),
    AuthService     = require('../../services/auth'),
    UIStateStore    = require('../../stores/uistate')
    Header          = require('./header'),
    SessionPanel    = require('./sessionPanel'),
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
    onContentMouseEnter: function() {
        if (UIStateStore.sessionPanelIsVisible()) Actions.hideSessionPanel();
    },
    render: function() {
        return (
            <div id="public">
                <Header/>
                <SessionPanel/>
                <div id="content" onMouseEnter={this.onContentMouseEnter}>
                    <this.props.activeRouteHandler/>
                </div>
                <Footer/>
            </div>
        );
    }
});

module.exports = PublicPageWrapper;