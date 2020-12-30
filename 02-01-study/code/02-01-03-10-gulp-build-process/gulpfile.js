const fs = require('fs')
const { Transform } = require('stream')
/**
 * 输入-读取文件-读取流
 * 加工-压缩文件- 转换流
 * 输出- 写入文件- 写入流
 */
exports.default = () => {
    // 创建文件的读取流
    const read = fs.createReadStream('normalize.css')
    // 创建文件的写入流
    const write = fs.createWriteStream('normalize.min.css')
    // 创建文件的转化流
    const transform = new Transform({
        transform: (chunk, encoding, callback) => {
            //核心转换过程
            /**
             * chunk => 读取流中读取到的内容（Buffer），是一个字节数组
             * 
             */
            const input = chunk.toString()
            //去掉空格和注释
            const outPut = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
            // callback是一个错误优先的函数，如果没有错误要传入null
            callback(null, outPut)
        }
    })
    // 把读取出来的读取流导入到文件的写入流中
    read
        .pipe(transform)
        .pipe(write)
    // gulp根据流的状态去判断任务是否执行完成
    return read
}

/**
 * gulp The streaming build system，就是基于流的方式，主要是想实现一个关于管道的概念
 */