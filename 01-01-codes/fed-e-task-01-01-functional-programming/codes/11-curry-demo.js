//柯里化案例
const _ = require('lodash')
//匹配字符串中的所有字符
// ''.match(/\s+/g)
//匹配字符串中的所有数字
// ''.match(/\d+/g)

//函数式编程可以最大程度的重用函数
// function match(reg,str){
//   return str.match(reg)
// }

//match柯里化处理
let match = _.curry(function (reg, str) {
  return str.match(reg)
})


const haveSpace = match(/\s+/g)
const haveNum = match(/\d+/g)

console.log(haveSpace('Hello Sine ya'))
console.log(haveNum('Hello2 Sine4 ya1'))

//寻找数组中所有含有空格的字符串
const filter = _.curry(function (fn, arr) {
  return arr.filter(fn)
})
const filter = _.curry((fn, arr) => {
  return arr.filter(fn)
})

const findSpace = filter(haveSpace)

console.log(filter(haveSpace, ['qw e', 'rf p', 'ert']))


console.log(findSpace(['oi p', 'ioj']))