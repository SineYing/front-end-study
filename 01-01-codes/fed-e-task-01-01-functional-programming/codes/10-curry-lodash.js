//lodash中的curry基本使用
const _ = require('lodash')

//柯里化可以帮我们把任意多元函数转为一元函数
function getSum(a, b, c) {
    return a + b + c
}

const curried = _.curry(getSum)
//如果传入了getSum所需要的所有参数，则会被立即调用并返回结果
console.log(curried(1,2,3))
//如果传入参数为部分参数,它会返回一个函数，并且等待接收其他的参数
console.log(curried(1)(2,3))
console.log(curried(1)(2)(3))