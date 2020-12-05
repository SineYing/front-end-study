//promise 基本示例
const promise = new Promise((resolve,reject)=>{
    //这里用于”兑现“承诺
    resolve(100)//承诺达成
    reject(new Error('promise rejected'))//一般传入一个错误对象，来描述失败的理由
    //promise 的状态一旦被确认了就不可以被修改了
    //所以这里只能被调用其1
})
promise.then((value)=>{
    console.log(value)
})