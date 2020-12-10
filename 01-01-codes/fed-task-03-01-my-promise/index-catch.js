
/*

*/
const MyPromise = require('./myPromise.js')
function p1() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1')
        }, 2000)
    })
}
function p2() {
    return new MyPromise((resolve, reject) => {
        // resolve('p2 resolve')
        reject('p2 reject')
    })
}

/*
用来处理当前回调函数状态为失败的情况的
也就是说我们使用then方法时我们是可以不传递失败回调的
那么失败回调就会被catch方法所捕获
*/
p2().then(value => console.log(value))
    .catch(reason => console.log(reason))