//functor

// class Container {
//     constructor(value) {
//         //函子要维护一个值，这个值不对外公布
//         // 有_的成员都是私有成员，不对外公布
//         this._value = value
//     }
//     //对外公布一个map方法，map方法接收一个处理值的函数
//     //当我们调用map方法的时候，会去调用fn去处理这个value，并且把处理的结果传给这个新的函子，
//     //由新的函子来保存
//     map(fn) {
//         return new Container(fn(this._value))
//     }
// }

// //创建一个函子对象
//     //new很面向对象
// let r = new Container(5)

//     .map(x => x + 1)
//     .map(x => x * x)
//      //map方法返回的不是一个值，而是一个最新的函子对象，在新的函子对象里面去保存新的值，始终不把值对外公布，
//      //想要处理值的话就给map传递一个处理值的函数
// console.log(r)


class Container {
    //函数式 创建静态的方法of，给我们返回一个函子对象
    //静态方法，可以直接通过类名来调用Container.of
    static of(value) {
        return new Container(value)
    }
    constructor(value) {
        this._value = value
    }
    map(fn) {
        return Container.of(fn(this._value))
    }
}

//      //map方法返回的不是一个值，而是一个最新的函子对象，在新的函子对象里面去保存新的值，始终不把值对外公布，
//      //想要处理值的话就给map传递一个处理值的函数
let r = Container.of(5)
    .map(x => x + 2)
    .map(x => x * x)
console.log(r)

//演示 null undefined 的问题
Container.of(null)
    .map(x => x.toUpperCase())

//输入null的时候没有输出，所以输入null时就出现了副作用