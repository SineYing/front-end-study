//promise 基本示例
const promise = new Promise((resolve,reject)=>{
    //这里用于”兑现“承诺
    resolve(100)
    reject(new Error(''))
})
promise.then((value)=>{
    console.log(value)
})