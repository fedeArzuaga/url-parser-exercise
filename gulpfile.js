// List dependencies
const { src, dest, watch, series } = require('gulp');
const less = require('gulp-less');
const prefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const minifyJS = require('gulp-minify');
const browsersync = require('browser-sync').create();

// Created functions

// Minify HTML
function minifyHTML() {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}

// Compile Less
function compileLess() {
    return src('src/less/**/*.less')
        .pipe( less() )
        .pipe( prefixer() )
        .pipe( minifyCSS() )
        .pipe(dest('dist/css'))
}

// JS
function js() {
    return src('src/scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        // .pipe(minifyJS())
        .pipe(dest('dist/scripts'))
}

// Browser sync tasks
function browsersyncServe(callback) {
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    });
    callback();
}

function browsersyncRelaod(callback) {
    browsersync.reload();
    callback();
}

// Create watch tasks
function watchTask() {
    watch('src/*.html', series(minifyHTML, browsersyncRelaod));
    watch('src/less/**/*.less', series(compileLess, browsersyncRelaod));
    watch('src/scripts/*.js', series(js, browsersyncRelaod));
}

// Default gulp
exports.default = series(
    minifyHTML,
    compileLess,
    js,
    browsersyncServe,
    watchTask
);