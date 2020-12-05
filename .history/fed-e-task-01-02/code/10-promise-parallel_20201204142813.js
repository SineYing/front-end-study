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

var promise = Promise.all([
    ajax('/api/users.json'),
    ajax('/api/posts.json')
])
promise.then((values)=>{
    console.log(values)
}).catch((error)=>{
    console.log(error)
})

//组合使用串行和并行这两种方式
//先使用ajax获取到所有的请求地址
ajax('/api/urls.json')
.then((value)=>{
    const urls = Object.values(value)
    const tasks = urls.map((item)=>ajax(item))
    Promise.all(tasks)
    .then((values)=>{
        console.log(values)
    })
    .catch((error)=>{
        console.log(error)
    })
})


//promise.race()
const request = ajax('/api/posts.json')
const timeout = 