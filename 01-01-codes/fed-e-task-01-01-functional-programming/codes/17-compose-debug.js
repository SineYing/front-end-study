//函数组合调试
//NEVER SAY DIE --> never-say-die

const _ = require('lodash')

// const log=(c)=>{
//     console.log(c)
//     return c
// }
const trace = _.curry((tag, v) => {
    console.log(tag, v)
    return v
})

//_.split
const split = _.curry((sep, str) => _.split(str, sep))
//_.toLower
const map = _.curry((fn, arr) => _.map(arr, fn))
//_.join
const join = _.curry((seq, arr) => _.join(arr, seq))

const result = _.flowRight(join('-'),trace('map之后打印'), map(_.toLower),trace('split之后打印'), split(' '))
console.log(result('NEVER SAY DIE'))