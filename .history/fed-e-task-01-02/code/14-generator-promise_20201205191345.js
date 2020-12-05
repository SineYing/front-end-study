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

function * main(){
    const user =yield ajax('/api/users.json')
    console.log(user)
}
const g = main()
const result= g.next()
result.value.then(data=>{
    
})

