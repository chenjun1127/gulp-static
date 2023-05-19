const gulp = require('gulp');
const connect = require('gulp-connect');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

function html() {
  gulp
    .src('./src/views/pages/*.html')
    .pipe(
      fileinclude({
        // 使用 fileinclude 插件
        prefix: '@@', // 设置包含标记的前缀
        basepath: './src/views/include', // 设置被包含文件所在的目录
        indent: true // 是否缩进
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 压缩 HTML
        removeComments: true, // 移除注释
        minifyCSS: true, // 压缩 CSS
        minifyJS: true // 压缩 JS
      })
    )
    .pipe(gulp.dest('./dist')) // 输出到目标文件夹
    .pipe(connect.reload()); // 刷新浏览器
}

function js() {
  return gulp
    .src('./src/**/*.js') // 读取 JavaScript 文件
    .pipe(
      babel({
        presets: ['@babel/env']
      })
    )
    .pipe(concat('bundle.js')) // 合并 JavaScript 文件
    .pipe(uglify()) // 压缩 JavaScript 文件
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload()); // 输出压缩后的 JavaScript 文件
}

function css() {
  return gulp
    .src(['src/**/*.css', 'src/**/*.scss']) // 读取 CSS 文件
    .pipe(sass()) // 编译 SCSS 文件
    .pipe(autoprefixer()) // 添加 CSS 前缀
    .pipe(concat('bundle.css')) // 合并 CSS 文件
    .pipe(rename({ suffix: '.min' })) // 重命名压缩后的文件
    .pipe(cleanCSS()) // 压缩 CSS 文件
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload()); // 输出压缩后的 CSS 文件
}

function server() {
  connect.server({
    // 启动本地服务器
    root: 'dist',
    livereload: true
  });
}
function watch() {
  gulp.watch('./src/views/pages/*.html', html); // 监听 HTML 文件变化
  gulp.watch('./src/js/*.js', js); // 监听 js 文件变化
  gulp.watch(['./src/css/*.css', './src/sass/*.scss'], css); // 监听 css 文件变化
}

// 打包和运行 HTML 文件
exports.default = gulp.parallel(server, watch, gulp.series(js, css, html));
