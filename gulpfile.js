const { src, dest, watch, series } = require('gulp')
const scss = require('gulp-sass')(require('sass'))
const prefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-clean-css')
const terser = require('gulp-terser')
const browsersync = require('browser-sync').create()


function sass() {
    return src('./frontend/src/styles/**/*.scss')
        .pipe(scss())
        .pipe(prefixer('last 2 versions'))
        .pipe(cssmin())
        .pipe(dest('./frontend/dist/styles/'))
}

function scripts() {
    return src('./frontend/src/scripts/**/*.js')
    // .pipe(terser())
    .pipe(dest('./frontend/dist/scripts/'))
}

function browsersyncServe(cb) {
    browsersync.init({ server: { baseDir: '.' }})
    cb()
}

function browsersyncReload(cb) {
    browsersync.reload()
    cb()
}

function watchTask() {
    watch('*.html', browsersyncReload)
    watch([
        './frontend/src/styles/**/*.scss',
        './frontend/src/scripts/**/*.js'], 
        series(sass, scripts, browsersyncReload))
}

exports.default = series(
    sass, 
    scripts,
    browsersyncServe,
    watchTask
);