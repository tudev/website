/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

// React-router variables
var Link    = Router.Link;

var Splash = React.createClass({
    render: function() {
        var blurb = {
            title: 'We\'re Temple Dev',
            subtitle: 'We write software and build things'
        };

        return (
            <div id="splash">
                <div id="blurb">
                    <h1>{blurb.title}</h1>
                    <div className="divider"/>
                    <h2>{blurb.subtitle}</h2>
                    <div className="buttons">
                        <Link to="about" id="learn-more">Learn More</Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Splash;