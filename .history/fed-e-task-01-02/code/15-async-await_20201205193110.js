//async Await

/*
更方便的语法糖
*/

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


//async 是语言层面的标准过程语法，可以给我们返回一个promise对象,
比较有利于我们对整体代码进行控制
async function main() {
    try {
        const user = await ajax('/api/users.json')
        console.log(user)
        const posts = await ajax('/api/posts.json')
        console.log(posts)
    } catch (e) {
        console.log(e)
    }
}

const promise = main()
promise.then(()=>{

})