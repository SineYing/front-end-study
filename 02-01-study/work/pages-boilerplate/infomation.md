# 作业说明

## 首先确认要通过gulp实现的功能

- 确认gulp环境
- sass文件编译
- js文件编译
- html编译
- 图片文件转换
- 字体文件转换
- public目录文件处理
- 添加开发服务器
- 监视变化及构建变化
- useref文件引用处理
- 文件压缩
- 代码检测功能添加
- 重新规划构建过程
- 清理暴露的内容

## 开始环境配置

首先安装gulp依赖

```js
yarn add gulp --dev
```

### 创建style私有任务进行sass文件编译

添加gulp-sass编译依赖
```js
yarn add gulp-sass --dev
```

通过src的读取流pipe到dest的写入流

```js
const style = () => {
//base属性是添加基准目录属性，保证输出路径与原路径保持一致
    return src('src/assets/styles/*.scss', { base: 'src' })
 					// 实现sass的编译，带有“_”的sass文件被默认为其他样式文件引用的文件，编译的时候会被忽略掉
  				//outputStyle用于指定编译文件的格式
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(dest('dist'))
}
//可以通过module.exports导出进行测试style
module.exports = {
    style
}
```
在控制台执行 yarn gulp style 可进行测试

### 创建脚本的编译任务

添加 gulp-babel 开发依赖,用于编译scripts

```js
yarn add gulp-babel --dev
//preset-env全部的es6新特性都会进行转换
yarn add @babel/core @babel/preset-env --dev
```

通过src的读取流pipe到dest的写入流

```js
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
    //用于编译script
  /*
  babel如果不传入参数，则scripts不进行任何处理，preset-env插件对全部的es6新特性都会进行转换，一般是添加一个babel.rc.js文件
  */
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(dest('dist'))
}

module.exports = {
    script
}
```

执行yarn gulp script可进行测试

### 模板文件编译

因为项目中使用的是swig模板转换引擎，所以进行swig安装,并载入插件

```js
yarn add gulp-swig --dev
```

创建页面编译任务

```js
const page = () => {
  //src/**/*.html匹配src文件夹下所有的.html文件，swig函数中可进行传参
    return src('src/**/*.html', { base: 'src' })
        .pipe(swig())
        .pipe(dest('dist'))
}
module.exports = {
    style,
    script,
    page
}
```

执行yarn gulp page可进行测试

### 图片和字体转换

添加图片压缩依赖,并导入。gulp-imagemin里面包含二进制数据集，要从github进行下载，如有问题需要进行镜像处理。

图片进行的是无损的压缩。只是删除源数据信息，svg进行的是代码的格式化

```js
yarn add gulp-imagemin --dev
```

创建图片和字体转换任务

```js
const img = () => {
    return src('src/assets/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}
module.exports = {
    img
}
```

执行yarn gulp img可进行测试

创建字体压缩任务

```js
//imagemin用于处理字体文件夹中的svg
const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}
module.exports = {
    font
}
```

执行yarn gulp font可进行测试

### 组合任务创建

因为一般情况下样式、脚本以及模板是同时进行编译的，所以通过创建组合任务来完成

```js
/**
 * 创建组合任务
 * 因为style，script，page,img,font任务没有任何牵连，所以可以使用parallel进行并行任务，提高运行效率
 */
const compile = parallel(style, script, page,img,font)
module.exports = {
    compile
}
```

执行yarn gulp compile可进行测试

### public文件夹的拷贝

```js
//进行public文件夹的拷贝
const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}
```

因为容易与src文件夹下的任务产生混淆所以将public文件夹任务独立为build

```js
const build = parallel(compile,extra)
```



### 开发体验的增强

添加del模块，并引用。用于删除之前创建的dist文件夹

del不是gulp的插件但是在gulp中可以使用，del可以删除指定的文件，而且gulp是promise方法，且gulp支持promise方法

```js
yarn add del --dev
```

添加清除任务

```js
/**
 * del接收数组参数，内容为指定路径
 */
const clean = () => {
    return del(['dist'])
}
/**
 * 因为要先删除dist文件再进行压缩所以要使用series
 */
const build = series(clean, parallel(compile, extra))
module.exports = {
    build
}
```

执行yarn gulp build可进行测试

### 添加插件自动加载依赖

```js
yarn add gulp-load-plugins --dev
```

```js
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
```

### 开发服务器的热更新

添加browser-sync开发服务器，热更新。并不是gulp的插件，需要在gulp中引用

```js
yarn add browser-sync --dev
```

```js
/**
 * 创建开发服务器
 */
const bs = browserSync.create()
/**
 * 创建serve任务，初始化服务器的配置
 */
const serve = () => {
    bs.init({
        notify:false,//关闭提示
        port:2080,//配置启动端口
        // open:false,//取消自动打开浏览器
        // 核心配置是serve
        server:{
            //配置网站的根目录
            baseDir:'dist',
            // 开发环境下将页面中的/node_modules指向node_modules
            routes:{
                '/node_modules':'node_modules'
            }
        }
    })
}
```

执行yarn gulp serve可进行测试

使用gulp的watch来监视文件的更改

```js
const serve = () => {
    // 监视任务的执行，覆盖dist文件，files会监视到dist文件的改变
    watch('src/assets/styles/*.scss',style)
    watch('src/assets/scripts/*.js',script)
    watch('src/**/*.html',page)
    // 因为开发环境中图片字体以及public没有压缩的必要所以这里的监听先去掉
    // watch('src/assets/images/**',img)
    // watch('src/assets/fonts/**',font)
    // watch('public/**',extra)

    bs.init({
        notify: false,//关闭提示
        port: 2080,//配置启动端口
        // open:false,//取消自动打开浏览器
        files: 'dist/**',//监听files文件夹下的所有文件是否发生改变
        // 核心配置是serve
        server: {
            //配置网站的根目录
            /**
             * 如果设置baseDir属性为数组，会依次按照数组定义的顺序往后查找
             */
            baseDir: ['dist','src','public'],
            // 开发环境下将页面中的/node_modules指向node_modules
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}
/*将compile中的img和font任务放到build阶段
*/
const compile = parallel(style, script, page)
const build = series(clean, parallel(compile,img, font, extra))

/**
 * 创建开发模式下任务
 */
const develop = series(compile, serve)
module.exports = {
    develop
}
```

执行yarn gulp develop可进行测试

### useref文件引用处理

添加useref依赖

```js
yarn add gulp-useref --dev
```

```js
const useref = () => {
    // 主要是处理dist文件夹下的文件引用问题
    return src('dist/*.html', { base: 'dist' })
    // useref会自动挂载到plugins对象下面,通过searchPath配置查找路径,dist目录和根目录，一般使用情况较多的放在前面
    //useref会自动处理dist文件下面的构建注释，在此过程中会将引用到的js以及css压缩到一个单独的文件中
    .pipe(plugins.useref({searchPath:['dist','.']}))
    .pipe(dest('dist'))
}
```

执行yarn gulp useref可进行测试

### 文件压缩

添加压缩插件gulp-htmlmin压缩html ,gulp-uglify压缩js,gulp-clean-css压缩css

```js
yarn add gulp-htmlmin gulp-uglify gulp-clean-css --dev
```

添加判断插件gulp-if

```
yarn add gulp-if --dev
```

处理后的useref

```js
const useref = () => {
    // 主要是处理dist文件夹下的文件引用问题
    return src('dist/*.html', { base: 'dist' })
        // useref会自动挂载到plugins对象下面,通过searchPath配置查找路径,dist目录和根目录，一般使用情况较多的放在前面
        //useref会自动处理dist文件下面的构建注释，在此过程中会将引用到的js以及css压缩到一个单独的文件中
        .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
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
            minifyCSS:true,
            miniFyJS:true
         })))
        /**
         * 因为读的同时在写入会有冲突，所以要写入到一个新的文件夹
         */
        .pipe(dest('release'))
}
```

### 代码检测功能添加

添加代码检测插件

```js
yarn add gulp-eslint --dev
```

创建任务

```js
const lint = () => {
    return src(['src/assets/scripts/*.js'])
    .pipe(plugins.eslint(({
		rules: {
			'my-custom-rule': 1,
			'strict': 2
		},
		globals: [
			'jQuery',
			'$'
		],
		envs: [
			'browser'
		]
	})))
    // format（）将lint结果输出到控制台。
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.formatEach('compact', process.stderr));
}
module.exports = {
    lint,
}
```



### 重新规划构建过程

首先要将build秤称重会产生中间产物的任务生成路径改为中间产物文件夹temp

```js
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
//useref过程中的引用文件夹也要冲dist改为中间过程文件夹temp
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
            minifyCSS:true,
            miniFyJS:true
         })))
        /**
         * 因为读的同时在写入会有冲突，所以要写入到一个新的文件夹
         */
        .pipe(dest('dist'))
}
/**
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


```

### 清理暴露的内容

```js
/*
现有的任务有style/script/js/img/font/extra/compile/build/useref/serve/clean
用户常使用是开发模式和发布模式
按照pakage.json中的script内容输出以下内容
*/
module.exports = {
    clean,
    serve,
    build,
    start,
    compile,
    lint,
}
```



进入控制台执行npm run 相应的命令就可以了