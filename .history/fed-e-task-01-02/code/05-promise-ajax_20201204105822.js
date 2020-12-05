const { retrieveSourceMap } = require("source-map-support");

//promise方式的ajax
function ajax (url){
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.responseType='json'
    })
}