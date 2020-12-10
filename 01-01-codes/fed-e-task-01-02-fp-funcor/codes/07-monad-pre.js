//IO 函子
const fs = require('fs')
const fp = require('lodash/fp')
class IO {
    static of(value) {
        return new IO(function () {
            return value
        })
    }
    constructor(fn) {
        this._value = fn
    }
    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
}

let readFile = function (filename) {
    /* 因为在读取文件的时候会引起副作用会让这个函数不纯，所以我们不直接去读取文件，而是返回一个IO的函子
    把读取文件的这个过程去延迟执行
    */
    return new IO(function () {
        //readFileSync同步去读取文件，并把结果返回
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function (x) {
    return new IO(function(){
        console.log(x)
        return x
    })
}

let cat = fp.flowRight(print,readFile)
//cat IO(IO(x))
let r = cat('package.json')
console.log(r._value()._value())