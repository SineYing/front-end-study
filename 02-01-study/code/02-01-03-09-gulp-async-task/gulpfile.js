const fs = require('fs')
//异步任务的三种方式
//通过回调函数解决
//与node中的回调函数是同样的标准是一种错误优先的回调函数
exports.callback = done => {
    console.log('callback tasks')
    done()
}
//如果想在程序中报出一个错误来阻止剩下的任务执行的时候，给回调函数指定一个错误对象就可以了
exports.callback_error = done => {
    console.log('callback tasks')
    done(new Error('执行错误'))
}


// promise方案

exports.promise = () => {
    console.log('promise task')
    // Promise.resolve()表示任务结束了，resolve的时候不需要返回任何值，gulp中会忽略这个值
    return Promise.resolve()
}
exports.promise_error = () => {
    console.log('promise task')
    // Promise.resolve()表示任务结束了，resolve的时候不需要返回任何值，gulp中会忽略这个值
    return Promise.reject(new Error('执行错误'))
}

//async await  是promise的语法糖

const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

exports.async = async () => {
    await timeout(1000)
    console.log('async task')
}

// stream方式
exports.stream = () => {
    // 创建一个读取的文件流
    const readStream = fs.createReadStream('package.json')
    // 创建一个写入文件的文件流
    const writeStream = fs.createWriteStream('temp.txt')
    //将readStream通过pipe的方式导入到writeStream中
    readStream.pipe(writeStream)
    // 这个任务结束的时机就是readStream进行end的时候，因为文件流中有个end事件，因为文件流读取完成后都会触发end事件，从而gulp就知道任务完成了
    //
    return readStream
}
// 模拟end事件
exports.stream_ = done => {
    const readStream = fs.createReadStream('package.json')
    const writeStream = fs.createWriteStream('temp.txt')
    readStream.pipe(writeStream)
    readStream.on('end',()=>{
        done()
    })
}