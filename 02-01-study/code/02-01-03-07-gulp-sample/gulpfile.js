// gulp的入口文件
//此文件运行在node.js的环境中，所有可以使用common.js规范，通过导出函数成员的方式去定义
//安装完 gulp依赖会在node_modules中的bin文件夹生成一个gulp文件，所以在当前文件夹下可以使用gulp命令
exports.foo = done => {
    console.log('foo tasks~')
    /**
     * 最新的gulp中取消了同步代码模式，约定所有的任务以异步模式执行
     * 当一个任务完成我们需要调用回调函数或者去标记任务的完成
     *  
     * 
    */
    done()//标识任务完成
}
//default是默认任务yarn gulp即可执行
exports.default = done => {
    console.log('default tasks~')
    done()//标识任务完成
}

// gulp4.0以前是通过gulp里面的方式来实现任务的注册,此种方式不被推荐

const gulp = require('gulp')

gulp.task('bar', done => {
    console.log('bar tasks~')
    done()//标识任务完成
})