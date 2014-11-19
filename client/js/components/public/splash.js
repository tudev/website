/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

var Util    = require('../../util');

// React-router variables
var Link    = Router.Link;

var Splash = React.createClass({
    getInitialState: function() {
        return {
            splashLoaded: false,
            blurbVisible:  false
        };
    },
    componentDidMount: function() {
        var component = this;
        // Wait for the splash image to load
        Util.assets.waitForImages(['/static/img/splash-bg.jpg'], function() {
            // Show content via animation
            Util.time.sequence({
                0: function() {
                    // Show the splash
                    component.setState({
                        splashLoaded: true
                    });
                },
                250: function() {
                    // Show the blurb
                    component.setState({
                        blurbVisible: true
                    });
                }
            });
        });
    },
    render: function() {
        return (
            <div id="splash" className={this.state.splashLoaded ? '' : 'hidden'}>
                <div id="blurb" className={this.state.blurbVisible ? '' : 'loading'}>
                    <div className="divider"/>
                    <h1>We&#39;re <span>Temple Dev</span></h1>
                    <h2>We write software and build things</h2>
                    <div className="divider"/>

                    <div className="buttons">
                        <Link to="about" id="learn-more">Learn More</Link>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Splash;