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




//onRejected
ajax('/api/users111.json').then((res)=>{
    console.log(1111)
    return ajax('/api/users.json')
},(error)=>{
    console.log('onRejected',error)
})


//
ajax('/api/users111.json').then((res)=>{
    console.log(1111)
    return ajax('/api/users.json')
})
.catch((error)=>{
    console.log('onRejected',error)
})


//

