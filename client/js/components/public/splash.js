/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    AppStateStore   = require('../../stores/appstate');

// React-router variables
var Link            = Router.Link;

var Splash = React.createClass({
    getInitialState: function() {
        return {
            splashLoaded: false,
            blurbVisible:  false
        };
    },
    componentDidMount: function() {
        Actions.changePageTitle();

        if (AppStateStore.isReady()) {
            if (AppStateStore.splashHasLoaded()) {
                // If the splash is already loaded, merely show the blurb
                this.setState({
                    splashLoaded: true,
                    blurbVisible: true
                });
            } else {
                // Otherwise, load splash first - then show blurb
                this.showSplash();
            }
        } else {
            // Register for ready event
            AppStateStore.onReady(this.onReady);
        }
    },
    componentWillUnmount: function() {
        // Unregister for ready event
        AppStateStore.offReady(this.onReady);
    },
    showSplash: function() {
        var component = this;
        // Wait for the splash image to load
        Util.assets.waitForImages(['/static/img/splash-bg.jpg', '/static/img/splash-icon.png'], function() {
            // Report that the splash has been loaded
            Actions.declareSplashLoaded();
            // Show content via animation
            Util.time.sequence({
                500: function() {
                    // Show the splash
                    component.setState({
                        splashLoaded: true
                    });
                },
                750: function() {
                    // Show the blurb
                    component.setState({
                        blurbVisible: true
                    });
                }
            });
        });
    },
    onReady: function() {
        this.showSplash();
        // Unregister for ready event
        AppStateStore.offReady(this.onReady);
    },
    render: function() {
        return (
            <div id="splash" className={this.state.splashLoaded ? '' : 'hidden'}>
                <div id="blurb" className={this.state.blurbVisible ? '' : 'loading'}>
                    <div className="logo"/>
                    <h1>We&#39;re <span>Temple Dev</span></h1>
                    <h2>We write software and build things</h2>
                    <Link to="about" id="learn-more">Learn More</Link>
                </div>
            </div>
        );
    }
});

module.exports = Splash;