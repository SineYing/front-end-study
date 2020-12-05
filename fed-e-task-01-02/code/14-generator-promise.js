const { gold } = require("color-name")

function ajax(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.responseType = 'json'
        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(xhr.response)
            } else {
                reject(new Error(xhr.statusText))
            }
        }
        xhr.send()
    })
}

function* main() {
    try {
        const user = yield ajax('/api/users.json')
        console.log(user)
        const posts = yield ajax('/api/posts.json')
        console.log(posts)
    } catch (e) {
        console.log(e)
    }
}
const g = main()
// const result = g.next()
// result.value.then(data => {
//     const result2 = g.next(data)
//     if (result2.done) return
//     result2.value.then(data => {
//         g.next(data)
//     })
// })
//有相应的co库
//让异步调用回归扁平化，不止要学习他的用法还要了解他的实现方式
function co(generator){
    const g= generator()
    function handleResult(result) {
        if (result.done) return
        result.value.then(data => {
            handleResult(g.next(data))
        },error=>{
            go.throw(error)
        })
    
    }
    handleResult(g.next())
}

co(main)
