/** @jsx React.DOM */
var React   = require('react');

var Splash = React.createClass({
    render: function() {
        var blurb = {
            title: 'We\'re Temple Dev.',
            subtitle: 'We write software and build things.'
        };

        return (
            <div id="splash">
                <div id="blurb">
                    <h1>{blurb.title}</h1>
                    <h2>{blurb.subtitle}</h2>
                </div>
            </div>
        );
    }
});

module.exports = Splash;