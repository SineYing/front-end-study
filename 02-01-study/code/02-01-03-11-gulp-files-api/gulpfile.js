//
const { src, dest } = require('gulp')
// 压缩css
const cleanCss = require('gulp-clean-css')
//重命名
const rename = require('gulp-rename')
exports.default = () => {
    // src读 dest写
    // return src('src/normalize.css')
    //     .pipe(dest('dist'))
    return src('src/*.css')
        .pipe(cleanCss())   
        .pipe(rename({extname:'.min.css'}))     
        .pipe(dest('dist'))
}