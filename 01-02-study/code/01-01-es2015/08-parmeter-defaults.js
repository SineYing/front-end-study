//参数默认值
// function foo(enable) {
//     // 短路运算的方式，如果传入false会发生错误
//     enable = enable || true
//     // es6之前设置默认值
//     enable = enable == undefined ? true : enable
//     console.log(enable)
// }

// es6设置默认值
//如果有多个参数的情况，我们的默认值参数要放到最后
function foo(qwe, bar = 123, enable = true) {
    console.log(enable)
    console.log(bar)
    console.log(qwe)
}
foo(345)