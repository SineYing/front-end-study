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
    const user
}