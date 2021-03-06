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


//catch是then的别名，更适合链式调用。

/*
每个then方法都是返回一个全新的promise对象，也就是说
*/
ajax('/api/users111.json').then((res)=>{
    console.log(1111)
    return ajax('/api/users.json')
})
//
.catch((error)=>{
    console.log('onRejected',error)
})


//

