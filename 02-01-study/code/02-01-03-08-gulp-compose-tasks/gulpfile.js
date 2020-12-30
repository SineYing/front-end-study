// gulp里的组合API
const { series, parallel } = require('gulp')
//没被export导出的任务我们称为私有任务

const task1 = done => {
    setTimeout(() => {
        console.log('task1 working~')
        done()
    }, 1000)
}
const task2 = done => {
    setTimeout(() => {
        console.log('task2 working~')
        done()
    }, 1000)
}
const task3 = done => {
    setTimeout(() => {
        console.log('task3 working~')
        done()
    }, 1000)
}
//series接收多个任务名称，而且会按照输入的顺序串行执行任务
//一般用于部署过程，要先编译后处理文件等
exports.foo = series(task1, task2, task3)

//并行任务结构
//一般用于编译过程 js和css可被同时编译
exports.bar = parallel(task1, task2, task3)