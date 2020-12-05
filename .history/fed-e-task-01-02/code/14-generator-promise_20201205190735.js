function ajax(url){
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest()
        xhr.open('GET',url)
        xhr.responseType='json'
    })
    

}