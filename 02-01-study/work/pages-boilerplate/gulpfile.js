// 实现这个项目的构建任务
const { src, dest, parallel, series, watch } = require('gulp')
const del = require('del')
const browserSync = require('browser-sync')
/**
 * 自动加载gulp的所有插件，loadPlugins会得到一个方法
 */
const loadPlugins = require('gulp-load-plugins')
/**
 * plugins会得到一个对象，所有的插件都会变成plugins的一个属性
 * 且命名方式为插件名称去掉gulp-，
 * 例如：gulp-sass-css =>plugins.sassCss
 */
const plugins = loadPlugins()

/**
 * 创建开发服务器
 */
const bs = browserSync.create()

/**
 * del接收数组参数，内容为指定路径
 */
const clean = () => {
    return del(['dist'])
}

const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
}

const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

const page = () => {
    return src('src/**/*.html', { base: 'src' })
        .pipe(plugins.swig())
        .pipe(dest('temp'))
}

const img = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
        // 如果bs.create中没有使用files的API，可以在这里将流推进浏览器
        .pipe(bs.reload({ stream: true }))
}

const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
        // 如果bs.create中没有使用files的API，可以在这里将流推进浏览器
        .pipe(bs.reload({ stream: true }))
}

const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
        // 如果bs.create中没有使用files的API，可以在这里将流推进浏览器
        .pipe(bs.reload({ stream: true }))
}
/**
 * 创建serve任务，初始化服务器的配置
 */
const serve = () => {

    // 监视任务的执行，覆盖dist文件，files会监视到dist文件的改变
    // watch根据监视的文件路径去决定要执行哪个任务
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/**/*.html', page)
    // 因为开发环境中图片字体以及public没有压缩的必要所以这里的监听先去掉
    // watch('src/assets/images/**',img)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)
    // 文件更新后自动启动bs.reload
    watch(['src/assets/images/**',
        'src/assets/fonts/**',
        'public/**'], bs.reload)
    // web服务器，有利于开发阶段的所见即所得
    bs.init({
        notify: false,//关闭提示
        port: 2080,//配置启动端口
        // open:false,//取消自动打开浏览器
        // files: 'dist/**',//监听files文件夹下的所有文件是否发生改变
        // 核心配置是serve
        server: {
            //配置网站的根目录
            /**
             * 如果设置baseDir属性为数组，会依次按照数组定义的顺序往后查找
             */
            baseDir: ['dist', 'src', 'public'],
            // 开发环境下将页面中的/node_modules指向node_modules
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

const useref = () => {
    // 主要是处理dist文件夹下的文件引用问题
    return src('temp/*.html', { base: 'temp' })
        // useref会自动挂载到plugins对象下面,通过searchPath配置查找路径,dist目录和根目录，一般使用情况较多的放在前面
        //useref会自动处理dist文件下面的构建注释，在此过程中会将引用到的js以及css压缩到一个单独的文件中
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
        /**
        * 读取到的html，css，js
        * 判断是否以.js结尾
        * 需要先运行compile再运行useref
        */
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        // 去掉HTML中的空白字符和换行符collapseWhitespace
        /**
         * 去掉html中css及js中的换行和空格
         */
        .pipe(plugins.if(/\.html$/, plugins.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            miniFyJS: true
        })))
        /**
         * 因为读的同时在写入会有冲突，所以要写入到一个新的文件夹
         */
        .pipe(dest('dist'))
}
/**
 * 创建组合任务
 * 因为style，script，page, img, font任务没有任何牵连，所以可以使用parallel进行并行任务，提高运行效率
 */
const compile = parallel(style, script, page)
/**
 * 因为要先删除dist文件再进行压缩所以要使用series
 * build上线之前执行的任务
 * useref要等compile任务执行完成后才可以执行所以为串行
 */
const build = series(
    clean,
    parallel(series(compile, useref),
        img,
        font,
        extra
    )
)

/**
 * 开发模式下
 */
const develop = series(compile, serve)
module.exports = {
    clean,
    build,
    develop,
}