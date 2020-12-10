
/*是将给定的值转为promise对象，也就是返回值是promise对象
所以在后面的链式调用中我们才能拿到这个resolve的值

如果参数为promise对象，则直接返回
*/
const MyPromise = require('./myPromise.js')
function p1(){
    return new MyPromise((resolve,reject)=>{
        resolve('hello')
    })
}

MyPromise.resolve(10).then(value=>console.log(value))
MyPromise.resolve(p1()).then(value=>console.log(value))