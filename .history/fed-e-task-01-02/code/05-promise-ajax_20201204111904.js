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