var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var less=require('gulp-less');

var path = {
    HTML: 'src/index.html',
    JS: ['src/*.jsx', 'src/**/*.jsx'],
    LESS: ['less/*.less', '!src/less/**/{reset,test}.less'],
    CSS:'css',
    MINIFIED_OUT: 'build.min.js',
    DEST_SRC: 'dist/src', //把从jsx文件转换而来的文件放这里
    DEST_BUILD: 'dist/build',
    DEST: 'dist'
};

//编码jsx
gulp.task('transform', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC))
})
//编码less
gulp.task('less',function(){
    gulp.src(path.LESS)
        .pipe(less())
        .pipe(gulp.dest(path.CSS));

})
//跟踪变化
gulp.task('watch', function(){
    var wathFiles=[];
    wathFiles=wathFiles.concat(path.JS);
    wathFiles=wathFiles.concat(path.LESS);
    console.log(wathFiles.toString());
    gulp.watch(wathFiles, ['transform','less']);
});
//名称为default的task，需要
gulp.task('default',['watch','transform','less']);


// //把src/index.html这个文件复制放到dist中
// gulp.task('copy', function(){
//    gulp.src(path.HTML)
//     .pipe(gulp.dest(path.DEST));
// });