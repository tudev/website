/** @jsx React.DOM */
var React   = require('react'),
    Router  = require('react-router');

// React-router variables
var Routes          = Router.Routes,
    Route           = Router.Route,
    DefaultRoute    = Router.DefaultRoute,
    NotFoundRoute   = Router.NotFoundRoute;

// Authentication related page components
var Login       = require('./components/login'),
    Register    = require('./components/register'),
    NotFound    = require('./components/404');
// Publicly accessible page components
var Public      = require('./components/public'),
    About       = require('./components/public/about'),
    Contact     = require('./components/public/contact'),
    Events      = require('./components/public/events'),
    Splash      = require('./components/public/splash'),
    Team        = require('./components/public/team');
// Member accessible page components
var Member      = require('./components/member'),
    Dashboard   = require('./components/member/dashboard'),
    Pay         = require('./components/member/pay'),
    Profile     = require('./components/member/profile');

// Routes representing the frontend
var sitemap = (
    <Routes location="history">
        <Route name="public" path="/" handler={Public}>
            <Route name="team" handler={Team}/>
            <Route name="about" handler={About}/>
            <Route name="events" handler={Events}/>
            <Route name="contact" handler={Contact}/>
            <DefaultRoute handler={Splash}/>
        </Route>
        <Route name="login" handler={Login}/>
        <Route name="register" handler={Register}/>
        <Route name="member" handler={Member}>
            <Route name="profile" handler={Profile}/>
            <Route name="pay" handler={Pay}/>
            <DefaultRoute handler={Dashboard}/>
        </Route>
        <NotFoundRoute handler={NotFound}/>
    </Routes>
);

// Bind the routes to the DOM
React.renderComponent(sitemap, document.body);