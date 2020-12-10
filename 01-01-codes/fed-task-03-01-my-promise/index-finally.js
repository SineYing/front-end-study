
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
        resolve('p2 resolve')
        // reject('p2 reject')
    })
}


p2().finally(() => {
    console.log('finally')
    return p1()
    //后面的then要等待p1这个异步函数执行完成之后再继续执行
}).then(value => console.log(value), reason => console.log(reason))