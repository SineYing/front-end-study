//lodash中的组合函数 _.flowRight
const _ = require('lodash')
const { CodeNode } = require('source-list-map')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

// const f = _.flowRight(toUpper,first,reverse)


// function compose(...args){
//     return function(value){
//         //对数组中的每一个元素去执行我们提供的一个函数，并将其汇总成一个单个的结果
           //acc 表示上一次的执行结果，fn表示当前管道
//         return args.reverse().reduce(function(acc,fn){
//             return fn(acc)
//         },value)
//     }
// }

const compose = (...args) => value => args.reverse().reduce((acc,fn) => fn(acc), value)
const f = compose(toUpper, first, reverse)
console.log(f(['we', 'rt4t', 'rer']))