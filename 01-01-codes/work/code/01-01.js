// setTimeout(function(){
//     var a= 'hello '
//     setTimeout(function(){
//         var b= 'lagou '
//         setTimeout(function(){
//             var c = 'I love you'
//             console.log(a + b + c)
//         },10)
//     },10)
// },10)

new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('hello ')
    }, 1000)
}).then(a => {
    return { a, b: 'lagou ' }
}).then(({a,b}) => {
    var c = 'I love you'
    console.log(a + b + c)
})