//记忆函数

const _ = require('lodash')
function getArea(r) {
    console.log(r)
    return Math.PI * r * r
}
// 会返回一个带有记忆功能的函数
// let getAreaWithMemory = _.memoize(getArea)
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))
// console.log(getAreaWithMemory(4))

//模拟memoize实现

function memoize(fn) {
    let cache = {}
    return function () {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn.apply(fn, arguments)
        return cache[key]
    }
}

let getAreaWithMemory = memoize(getArea)
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))
console.log(getAreaWithMemory(4))