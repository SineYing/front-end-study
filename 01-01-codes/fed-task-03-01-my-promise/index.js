//promise原理代码
/*
1.promise就是一个类,在执行这个类的时候要传递一个执行器进去，执行器会立即执行

2.promise中有3中状态分别为：成功fulfilled、失败rejected、等待pending
pending->fulfilled
pending->rejected
一旦状态确定就不可更改

3.resolve和reject函数是用来更改状态的
resolve:fulfilled
reject:rejected

4.then方法内部做的事情是判断状态，如果状态是成功，调用成功的回调函数，如果失败调用失败的回调函数。
每个promise都可以调用then方法，所以then方法是被定义在原型对象中的方法

5.then成功回调有一个参数，表示成功后的值，then失败回调有一个参数，表示失败后的原因

6.同一个promise的then方法是可以被调用多次的

7.then方法是可以被链式调用的，后面then方法的回调函数拿到值的上一个是一个then方法的回调函数的返回值
*/
const MyPromise = require('./myPromise.js')
//创建promise对象
let promise = new MyPromise((resolve, reject) => {
    /*
    添加一个延时定时器，让resolve代码在2s后进行执行

    代码的执行顺序

    首先代码肯定是从上到下依次执行的
    代码在执行到21行的时候，创建一个MyPromise的一个实例对象，创建实例对象的时候它的执行器会立即执行

    当执行器执行的时候会发现setTimeout是一个异步代码

    主线程中的代码是不会等待异步代码执行完成之后再去执行的，而是会立即执行

    当主线程中的代码执行完成后再去执行异步代码

    所以then会马上得到执行
    */
    setTimeout(() => {
        resolve('成功！....')
        // reject('失败!')
    }, 2000)
    // throw new Error('executor错误')
    // resolve('成功！')
    // reject('失败!1111')

})
//测试 返回promise
// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('other')
//     })
// }

// promise.then(value => {
//     console.log(1)
//     console.log(value)
//     return other()
// }, reason => {
//     console.log(reason)
// }).then((value) => {
//     console.log(value)
//     /*
//     value这里的value是上一个then的返回值
//     then方法是promise对象的也就是说，每个then发放都是返回promise对象的
//     */
// })


//测试自己返回自己
// let p1 = promise.then((value) => {
//     console.log(value)
//     return p1
// })
// p1.then(() => { }, reason => {
//     // console.log(reason)
//     console.log(reason.message)
// })

//错误捕获
// promise.then(value => {
//     console.log(2)
//     console.log(value)
//     throw new Error('executor错误')
// }, reason => {
//     console.log(reason)
// }).then(value => {
//     console.log(3)
//     console.log(value)
// }, reason => {
//     console.log(11111)
//     console.log(reason)
// })

// promise.then(value => {
//     console.log(value)
//     return '111'
// }, reason => {
//     console.log(reason)
//     return 10000
// }).then(value=>{
//     console.log(value)
// },reason=>{
//     console.log(reason)
// })
promise.then().then().then(value=>{
    console.log(value)
})