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




//onRejected 只是给第一个promise的错误进行回调，他只能捕获到第一个promise发生的错误
ajax('/api/users111.json').then((res)=>{
    console.log(1111)
    return ajax('/api/users.json')
},(error)=>{
    console.log('onRejected',error)
})


//catch是then的别名，更适合链式调用。

/*
每个then方法都是返回一个全新的promise对象，
也就是说链式的catch是在为前面then方法返回的失败进行回调，
并不是直接去给第一个promise发生的错误进行回调，只不过是因为这是同一个promise的链条，
前面promise上的异常会一直往后传递，所以我们才能捕获到第一个promise的异常
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

