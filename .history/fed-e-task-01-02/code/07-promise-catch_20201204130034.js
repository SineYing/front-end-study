//promise异常处理

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

var promise = ajax('/api/users.json')
var promise2 = promise.then(function onFulfilled(value) {
    console.log("onFullfilled", value)
}, function onRejected(error) {
    console.log("onRejected",error)
})
console.log(promise2)
console.log(promise)
// promise2！==promise

ajax('/api/users.json').then((res)=>{
    console.log(1111)
    return ajax('/api/users.json')
})
.then((res)=>{
    console.log(res)
    console.log(222)
    return 2
})
.then((res)=>{
    console.log(res)
    console.log(333)
})
