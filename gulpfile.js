var gulp = require('gulp'),
    // Generic imports
    path = require('path'),
    clean = require('rimraf'),
    // Browserify-related imports
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    // LESS-related imports
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    // HTML-related imports
    minify = require('gulp-minify-html'),
    // Dev-server-related imports
    nodemon = require('nodemon');

var helpers = {
    rebundle: function(bundle) {
        bundle
            .bundle()
            .pipe(source(path.join('client', 'js', 'main.js')))
            .pipe(gulp.dest(path.join('client', 'dist', 'js')));
    }
};

// Compiles the client js
gulp.task('browserify', function() {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    // React middleware for JSX
    bundler.transform(reactify);
    // Add the entry point
    bundler.add(path.join(__dirname, 'client', 'js', 'main.js'));
    // Perform initial rebundle
    return helpers.rebundle(bundler);
});

// Watches and recompiles client js
gulp.task('watchify', function() {
    var bundler = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true,
        debug: true
    });
    // Pass the browserify bundler to watchify
    bundler = watchify(bundler);
    // React middleware for JSX
    bundler.transform(reactify);
    // Bundlize on updates
    bundler.on('update', function() {
        helpers.rebundle(bundler);
    });
    // Add the entry point
    bundler.add(path.join(__dirname, 'client', 'js', 'main.js'));
    // Perform initial rebundle
    return helpers.rebundle(bundler);
});

// Compiles the client less
gulp.task('less', function() {
    gulp.src(path.join('client', 'less', 'main.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join('client', 'dist', 'css')));
});

// Condenses the pages
gulp.task('pages', function() {
    gulp.src('./client/pages/*.html')
        .pipe(minify({
            empty: true,
            spare: true
        }))
        .pipe(gulp.dest(path.join('client', 'dist', 'pages')));
});

// Clears all compiled client code
gulp.task('clean', function() {
    clean.sync(path.join(__dirname, 'client', 'dist'));
});

// Watches changes to the client code
gulp.task('watch', ['clean', 'less', 'pages', 'watchify'], function() {
    gulp.watch('client/pages/*.html', ['pages']);
    gulp.watch('client/less/**/*.less', ['less']);
});

// Runs dev server and watches client code
gulp.task('dev', ['watch'], function() {
    nodemon({
        script: 'index.js',
        ext: 'js',
        ignore: ['client/*'],
        env: {
            // Server environment
            PORT: 3000,
            DB: 'postgres://dvzydscckhxzfw:wdUhUlyWZs3PEFDeIV8eySfqpB@ec2-54-204-39-187.compute-1.amazonaws.com:5432/d3irc48flvi6oh',
            VERBOSE: true
        }
    });
});

// Run all compilation tasks
gulp.task('default', ['less', 'pages', 'browserify']);