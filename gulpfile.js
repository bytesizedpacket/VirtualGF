"use strict";

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

/* Set constant variables */
const SRC_PATH = 'src/';
const SRC_MAIN = 'Main.js';
const DIST_NAME = 'VirtualGF.js';

const WEBPACK_OPTS = {
	target: 'web',
	output: { filename: '[name].js' }
};

/* We don't want the watch event to fire
 * on temporary files created by editors */
const WATCH_IGNORE = [ 
	'!' + SRC_PATH + '/**/~*',
	'!' + SRC_PATH + '/**/.*̈́',
	'!' + SRC_PATH + '/**/*.sw?'
];

gulp.task('build', function() {
	return gulp.src(SRC_PATH + SRC_MAIN)
		.pipe( webpack(WEBPACK_OPTS) )
		.pipe( rename({ basename: DIST_NAME, extname: '' }) )
		.pipe( gulp.dest('') )
		.pipe( uglify() )
		.pipe( rename({ extname: '.min.js' }) )
		.pipe( gulp.dest('') );
});

gulp.task('watch', function() {
	gulp.watch([SRC_PATH + '/**', ...WATCH_IGNORE], ['build']);
});

/* Default gulp task is build, followed by watch */
gulp.task('default', ['build', 'watch']);
