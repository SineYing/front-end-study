const { retrieveSourceMap } = require("source-map-support");

//promise方式的ajax
function ajax (url){
    return new Promise((resolve,reject)=>{
        // XMLHttpRequest 对象用于在后台与服务器交换数据。
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        //responseType属性是一个枚举类型的属性,返回响应数据的类型
        /*
        ""默认采用DOMString，与设置”text“相同
        arraybuffer 返回一个包含二进制数据的JavaScript ArrayBuffer
        */
        xhr.responseType='json'
    })
}