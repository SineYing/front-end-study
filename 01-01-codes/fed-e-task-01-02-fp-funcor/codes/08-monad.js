//IO Monad函子
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
    /*
    是将当前的函数与this._value组合起来返回一个新的函子，所以需要用join把它变扁拍平
    
    */
    map(fn) {
        return new IO(fp.flowRight(fn, this._value))
    }
    //返回一个函子
    join() {
        return this._value()
    }
    /*
    同时去调用map和join，
    */
    flatMap(fn) {
        return this.map(fn).join()
    }

}

let readFile = function (filename) {
    //readFile是一个不纯的操作，因为要依赖外部的一些资源产生副作用，所以使用IO函子来保证当前的操作时纯的
    //固定的输入返回一个IO函子
    //不纯的操作直接甩给调用
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8')
    })
}

let print = function (x) {
    return new IO(function () {
        console.log(x)
        return x
    })
}

let r = readFile('package.json')
    .map(fp.toUpper)
    // 当我们调用的这个函数返回的是一个值我们调用map，如果返回一个函子我们调用flatMap
    .flatMap(print)
    .join()
console.log(r)

//当一个函数返回一个函子的时候，我们就会想到Monad，可以帮我们解决函子嵌套的问题