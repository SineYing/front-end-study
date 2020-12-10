//高阶函数-函数作为返回值
function makeFn() {
    let msg = 'make funciton'
    return function () {
        console.log(msg)
    }
}
// 用来接收makeFn返回的函数
// let fn = makeFn()
// fn()

//第一个（）表示执行makeFn再加一个（）表示执行makeFn返回的函数
// makeFn()()

//once
//支付的时候不管用户点击多少次，函数只执行一次

function once(fn) {
    //done来记录fn是否被执行
    let done = false
    return function () {
        //fn还未被执行
        if (!done) {
            done = true
            // 通过apply来调用fn,arguments表示调用当前函数的参数
            //apply使用会立即执行，这一点是和bind的区别
            return fn.apply(this, arguments)
        }
    }
}

let pay = once(function(money){
console.log(`支付：${money}RMB`)
})

pay(5)
pay(5)
pay(5)
pay(5)