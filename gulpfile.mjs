import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import pug from 'gulp-pug';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);

gulp.task('pug', function () {
    return gulp.src('src/**/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*', {encoding: false})
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: "/pug/index.html"
        },
    });
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/js/**/*.js', gulp.series('scripts'));
    gulp.watch('src/assets/images/**/*', gulp.series('images'));
});

gulp.task('default', gulp.series('pug', 'sass', 'scripts', 'images', 'watch'));