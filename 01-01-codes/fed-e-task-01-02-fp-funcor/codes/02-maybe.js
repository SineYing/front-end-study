//mayBe函子可以处理空
//创建一个MayBe的类
class MayBe {
    // 为了外部去创建函子的时候更方便一些，创建一个静态的方法of，把new的过程封装到of里面
    //接收value用于初始化这个构造函数
    static of(value) {
        return new MayBe(value)
    }
    // 初始化一个构造函数，接收一个value值
    constructor(value) {
        // 在构造函数里设置_value属性接收value值，把这个值保存下来，这个value是不希望外部访问的
        this._value = value
    }
    // 还要给函子设置一个map方法，用来接收一个函数，用来处理函子内部的值，并且去返回一个新的函子
    map(fn) {
        return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value))
    }

    isNothing() {
        return this._value === null || this._value === undefined
    }

}

// let r = MayBe.of("Hello World")
//     .map(x => x.toUpperCase())

// console.log(r)


// let r = MayBe.of(null)
//     .map(x => x.toUpperCase())

// console.log(r)

//问题
let r = MayBe.of('Hello World')
        .map(x => x.toUpperCase())
        .map(x => null)
        .map(x => x.split(''))

console.log(r)