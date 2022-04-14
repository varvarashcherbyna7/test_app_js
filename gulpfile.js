const { src, dest, series, watch } = require('gulp')
const gulp = require('gulp')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()
const deploy = require('gulp-gh-pages')

function html() {
    return src('src/**.html')
        .pipe(
            include({
                prefix: '@@',
            }),
        )
        .pipe(
            htmlmin({
                collapseWhitespace: true,
                removeComments: true,
            }),
        )
        .pipe(dest('build'))
}

function css() {
    return src('src/css/**/*.css')
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
            }),
        )
        .pipe(csso())
        .pipe(gulp.dest('build/css'))
}


// function img() {
//     return src('src/img/*').pipe(imagemin()).pipe(dest('build/img'))
// }

function js() {
    return gulp
        .src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['@babel/env'],
            }),
        )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build'))
}

function clear() {
    return del('build')
}

function serve() {
    sync.init({
        server: './build',
    })

    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/js/**.js', series(js)).on('change', sync.reload)
    watch('src/css/**.css', series(css)).on('change', sync.reload)
}

exports.build = series(clear, css, html, js)
exports.serve = series(clear, css, html, js, serve)
exports.clear = clear

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function() {
    return gulp.src('./build/**/*').pipe(deploy())
})