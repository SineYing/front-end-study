const { retrieveSourceMap } = require("source-map-support");

//promise方式的ajax
function ajax (url){
    return new Promise((resolve,reject)=>{
        // XMLHttpRequest 对象用于在后台与服务器交换数据。
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        //
        xhr.responseType='json'
    })
}