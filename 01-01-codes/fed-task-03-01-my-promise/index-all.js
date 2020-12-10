
/*
在promie.all中会按照我们调用的顺序返回p1和p2的结果
允许我们按照异步代码调用的顺序得到异步代码执行的结果
接收任何值包括普通值和promise对象
返回值也是一个promise对象
都是成功的，则是成功的
一个是失败的，则是失败的
all方法是静态方法
*/
const MyPromise = require('./myPromise.js')
function p1(){
    return new MyPromise((resolve,reject)=>{
         setTimeout(()=>{
            resolve('p1')
        },2000)
    })
}
function p2(){
    return new MyPromise((resolve,reject)=>{
        resolve('p2')
    })
}

Promise.all(['1','w',p1(),p2(),1]).then(result=>{
    console.log(result)
})