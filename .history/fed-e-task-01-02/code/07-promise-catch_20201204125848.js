//promise链式调用

const { retrieveSourceMap } = require("source-map-support");

//promise方式的ajax
function ajax(url) {
    return new Promise((resolve, reject) => {
        // XMLHttpRequest 对象用于在后台与服务器交换数据。
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        //responseType属性是一个枚举类型的属性,返回响应数据的类型
        /*
        "" 默认采用DOMString，与设置”text“相同
        arraybuffer 返回一个包含二进制数据的JavaScript ArrayBuffer
        blob 返回包含二进制的Blob对象
        document 返回HTMLDocument或者XML XMLDocument，这取决于接收到的数据的MIME类型
        json 返回JSON解析得到的JavaScript对象
        text 返回以DOMString对象表示的文本
        ms-stream 返回下载流的一部分，此类型只允许瞎子请求，并且只有IE支持
        */
        xhr.responseType = 'json'
        // 请求完成过后 xhr.readyState === 4的时候，onload才会执行
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
//这里的链式调用并不是在方法内部返回this的链式调用
/*
then返回的是全新的promise，为了实现一个promise的链条，一个承诺结束后返回一个新的承诺，每个
承诺都可以负责一个异步任务，相互之间没有影响，这就意味着不断链式调用then方法，每个then方法实际上
在为上一个then方法返回的promise对象去添加状态明确过后的回调

尽量保持代码的扁平化

如果上一个promise

*/
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
