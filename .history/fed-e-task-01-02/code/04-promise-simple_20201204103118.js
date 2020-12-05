//回调
const promise = new Promise((resolve,reject)=>{
    resolve(100)
    reject(new Error(''))
})
promise.then((value)=>{
    console.log(value)
})