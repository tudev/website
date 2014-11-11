var gulp		= require('gulp'),
	// Generic imports
	path		= require('path'),
	// Browserify-related imports
	browserify	= require('browserify'),
	source		= require('vinyl-source-stream'),
	watchify	= require('watchify'),
	reactify	= require('reactify'),
	// LESS-related imports
	less		= require('gulp-less');
	sourcemaps	= require('gulp-sourcemaps'),
	// HTML-related imports
	minify		= require('gulp-minify-html');

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
		.pipe(minify({ empty: true, spare: true }))
		.pipe(gulp.dest(path.join('client', 'dist', 'pages')));
});

// Watches changes to the client codebase
gulp.task('watch', ['less', 'pages', 'watchify'], function() {
	gulp.watch('client/pages/*.html', ['pages']);
	gulp.watch('client/less/**/*.less', ['less']);
});

// Run all compilation tasks
gulp.task('default', ['less', 'pages', 'browserify']);
