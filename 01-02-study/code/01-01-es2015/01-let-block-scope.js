// if (true) {
//     var foo = 'foo'
// }
// console.log(foo, 'var')
// //foo var 


// if (true) {
//     let fooLet = 'foo'
// }
// console.log(fooLet, 'var')
// //ReferenceError: fooLet is not defined

// //计数器 var
// for (var i = 0; i < 3; i++) {
//     for (var i = 0; i < 3; i++) {

//         console.log(i)
//     }
//     console.log('内层结束vari=' + i)
// }

// //计数器 let
// for (let i = 0; i < 3; i++) {
//     //起决定作用的是内部i
//     for (let i = 0; i < 3; i++) {
//         console.log(i)
//     }
//     console.log('内层结束leti=' + i)
// }

// //循环注册事件，访问计数器 var
// var elments = [{}, {}, {}]
// for (var i = 0; i < elments.length; i++) {
//     elments[i].onclick = () => {
//         // 打印的都是全局作用域下的i，在循环过后这个被累计到了3，所以打印哪个元素都是一样的
//         console.log(i,'循环注册事件')
//     }

// }
// elments[0].onclick()
// //3 循环注册事件

// //循环注册事件，访问计数器 闭包
// var elments = [{}, {}, {}]
// for (var i = 0; i < elments.length; i++) {
//     // 通过函数作用域摆脱全局作用域产生的影响
//     elments[i].onclick = ((i) => {
//         return () => console.log(i, '循环注册事件let')
//     })(i)

// }
// elments[1].onclick()
// //3 循环注册事件

// //循环注册事件，访问计数器 let
// var elments = [{}, {}, {}]
// for (let i = 0; i < elments.length; i++) {
//     // 其实内部也是闭包的机制
//     elments[i].onclick = () => {
//         console.log(i,'循环注册事件')
//     }

// }
// elments[0].onclick()
// //3 循环注册事件

// //for循环内部其实有两层作用域
// for (let i = 0; i < 3; i++) {
//     // 内层独立的作用域
//     let i = 5
//     console.log(i)
// }
// //表示这两个互不影响
// //5 5 5

//let不会有提升的情况
//变量声明的提升
console.log(foo)
console.log(qoo)
var foo = 'foo'
let qoo = 'qoo'
//undefined
//ReferenceError: Cannot access 'qoo' before initialization