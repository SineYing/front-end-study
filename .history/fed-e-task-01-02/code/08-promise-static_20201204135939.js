//回调
//promise方式的ajax
function ajax(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}


//promise.resolve()快速的把一个值转为onFullfilled的promise对象
// Promise.resolve('foo').then((value)=>{
//     console.log(value)
// })
// //完全等价于
// new Promise((resolve,reject)=>{
//     resolve('foo')
// }).then((value)=>{
//     console.log(value)
// })

//
var promise = ajax('/api/users.json')
var promise2 = Promise.resolve(promise)
console.log(promise===promise2)

//如果传入的是一个包含then方法的对象
Promise.resolve({
    then:(onFullfilled,onRejected)=>{
        onFullfilled('foo')
    }
})
.then((value)=>{
    console.log(value)
})

Promise.reject('iii').then((value)=>{
console.log(value)
}).catch((error)=>{
    console.log(error)
})