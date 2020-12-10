//IO 函子
const fp = require('lodash/fp')
class IO {
    // 使用of方法可以快速的去创建一个IO函子
    //IO函子最终想要的还是一个结果，只不过把取值的过程包装到一个函数当中，将来我们真需要这个值的时候再调用这个函数进行取值
    static of(value) {
        return new IO(function () {
            return value
        })
    }
    constructor(fn) {
        this._value = fn
    }
    map(fn) {
        // map方法中我们要把当前函子的value也就是这个函数和我们传入的fn组合成一个新的函数，而不是去调用函数处理值
        // 
        return new IO(fp.flowRight(fn, this._value))
    }
}

//调用
let r = IO.of(process).map(p => p.exec)
// console.log(r)
//IO { _value: [Function (anonymous)] }

console.log(r._value())