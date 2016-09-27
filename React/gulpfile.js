var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var less=require('gulp-less');
var replace=require('gulp-replace');

var path = {
    CopyFiles: ['*.html','css/*.css'],
    JS: ['src/*.jsx', 'src/**/*.jsx'],
    LESS: ['less/*.less'],
    HTML:['*.html'],
    DEST_SRC: 'dist/src', //把从jsx文件转换而来的文件放这里
    DEST_CSS:'dist/css',
    DEST_HTML:'dist',
    BowerJs:/bower_components\/[^"]*\/([^"]*\.js)/g

};

//编码jsx
gulp.task('jsx', function(){
    gulp.src(path.JS)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_SRC))
})
//编码less
gulp.task('less',function(){
    gulp.src(path.LESS)
        .pipe(less())
        .pipe(gulp.dest(path.DEST_CSS));
})

//copy HTML
gulp.task('copy-html',function(){
    gulp.src(path.HTML)
        .pipe(replace(path.BowerJs,"src/$1"))
        .pipe(replace(path.DEST_SRC,"src"))
        .pipe(replace(path.DEST_CSS,"css"))
        .pipe(gulp.dest(path.DEST_HTML));
})


//跟踪JSX变化
gulp.task('watchJS', function(){
    gulp.watch(path.JS, ['jsx']);
});

//跟踪LESS变化
gulp.task('watchCSS', function(){
    gulp.watch(path.LESS, ['less']);
});


//跟踪HTML变化
gulp.task('watchHTML', function(){
    gulp.watch(path.HTML, ['copy-html']);
});


//名称为default的task，需要
gulp.task('default',['copy-html','jsx','less','watchJS','watchCSS','watchHTML']);

