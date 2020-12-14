const gulp = require('gulp')
path = require('path')
sass = require('gulp-sass')
autoprefixer = require('gulp-autoprefixer')
csso = require('gulp-csso')
shorthand = require('gulp-shorthand')
sourcemaps = require('gulp-sourcemaps')
babel = require("gulp-babel")
concat = require('gulp-concat')
uglify = require('gulp-uglify-es').default
imagemin = require('gulp-imagemin')
clean = require('gulp-clean')
cleanCSS = require('gulp-clean-css')
browserSync = require('browser-sync')
livereload = require('gulp-livereload')
order = require("gulp-order")
minify = require("gulp-babel-minify");


gulp.task('sass-watch', function () {
    return gulp
        .src('./assets/sass/**/*.scss')
        .pipe(gulp.src('./assets/css/**/*.css'))
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(
            sass({
                paths: [path.join(__dirname, 'sass', 'includes')]
            })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});
gulp.task('js-watch', function () {
    return gulp
        .src('./assets/js/**/*.js')
        .pipe(order([
            'modules/**/*.js',
            'config/**/*.js'
        ]))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/js'));
});
gulp.task('css-min', function () {
    return gulp
        .src('./assets/sass/**/*.scss')
        .pipe(gulp.src('./assets/css/**/*.css'))
        .pipe(concat('app.css'))
        .pipe(
            sass({
                paths: [path.join(__dirname, 'sass', 'includes')]
            })
        )
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(shorthand())
        .pipe(cleanCSS({
            level: {
                2: {
                    mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
                    mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
                    mergeMedia: true, // controls `@media` merging; defaults to true
                    mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
                    mergeSemantically: false, // controls semantic merging; defaults to false
                    overrideProperties: true, // controls property overriding based on understandability; defaults to true
                    removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
                    reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
                    removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
                    removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
                    removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
                    removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
                    restructureRules: false, // controls rule restructuring; defaults to false
                    skipProperties: [] // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
                }
            }
        }))
        .pipe(gulp.dest('./build/css'));
});
gulp.task('js-min', function () {
    return gulp
        .src('./assets/js/**/*.js')
        .pipe(order([
            'modules/**/*.js',
            'config/**/*.js'
        ]))
        .pipe(concat('app.js'))
        .pipe(babel())
        .pipe(minify({
            mangle : {
                keepClassName: true
            }
        }))
        .pipe(uglify({
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        }))
        .pipe(gulp.dest('./build/js'));
});
gulp.task('img-min', function () {
    return gulp
        .src('./assets/images/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5
        }))
        .pipe(gulp.dest('./build/img'));
});
gulp.task('clean', function () {
    return gulp.src('./build', {read: false, allowEmpty: true})
        .pipe(clean());
});
gulp.task('fonts', function () {
    return gulp
        .src('./assets/fonts/**/*')
        .pipe(gulp.dest('./build/fonts'));
});
gulp.task('img', function () {
    return gulp
        .src('./assets/images/**/*')
        .pipe(gulp.dest('./build/img'));
});


gulp.task('browserSync', function () {
    browserSync({
        // proxy: 'http://salon.loc/',
        open: false,
        server: {
            baseDir: './',
        },
        notify: false
    })
    gulp.watch('./assets/sass/**/*.scss', gulp.parallel('sass-watch')).on('change', browserSync.reload);
    gulp.watch('./assets/js/**/*.js', gulp.parallel('js-watch')).on('change', browserSync.reload);
    gulp.watch('./assets/fonts/**/*', gulp.parallel('fonts')).on('change', browserSync.reload);
    gulp.watch('./assets/img/**/*', gulp.parallel('img')).on('change', browserSync.reload);
    gulp.watch('./assets/css/**/*', gulp.parallel('sass-watch')).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./*.php').on('change', browserSync.reload);
});


gulp.task('dev', gulp.series('sass-watch', 'js-watch', 'fonts', 'img', 'browserSync'));

gulp.task('build', gulp.series('clean', 'img-min', 'js-min', 'css-min','fonts'));