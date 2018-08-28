import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
const browserSync = require('browser-sync').create();
const $ = gulpLoadPlugins();

gulp.task('js', function() {
    return gulp.src('app/js/*.js')
        .pipe($.plumber())
        .pipe($.babel())
        .pipe($.uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.reload({ stream: true }));
})

gulp.task('css', function() {
    return gulp.src(['app/**/*.css', 'app/**/*.scss'])
        .pipe($.plumber())
        .pipe($.sass.sync().on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.concat('app.css'))
        .pipe($.cssnano())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('clean', function() {
    return gulp.src(['dist'])
        .pipe($.clean());
});

gulp.task('fileInclude', function() {
    return gulp.src(['app/views/pages/*.html'])
        .pipe($.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
    return browserSync.init({
        server: {
            baseDir: './',
            index: 'dist/index.html'
        },
        port: 8000
    });
});

// 监视文件变化，自动执行任务
gulp.task('watch', function() {
    gulp.watch(['app/**/*.css', 'app/**/*.scss'], ['css']);
    gulp.watch('app/js/*.js', ['js']);
    gulp.watch(['app/views/**/*.html'], ['fileInclude']).on('change', browserSync.reload);
})

gulp.task('build', ['clean'], function() {
    gulp.start('fileInclude')
    gulp.start('css')
    gulp.start('js')
    gulp.start('images')
    console.log('文件构建中...')
})

gulp.task('default', ['build'], function() {
    gulp.start(['watch', 'serve'])
});