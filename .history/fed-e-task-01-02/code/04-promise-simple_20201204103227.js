//promise 基本示例
const promise = new Promise((resolve,reject)=>{
    //这里用于”兑现“承诺
    resolve(100)//承诺达成
    reject(new Error(''))//一般
})
promise.then((value)=>{
    console.log(value)
})