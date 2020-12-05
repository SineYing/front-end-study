//promise 基本示例
const promise = new Promise((resolve,reject)=>{
    //这里用于”兑现“承诺
    resolve(100)//承诺达成
    reject(new Error('promise rejected'))//一般传入一个错误对象，来描述失败的理由
})
promise.then((value)=>{
    console.log(value)
})