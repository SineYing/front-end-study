//lodash中的组合函数 _.flowRight
const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

const f = _.flowRight(toUpper,first,reverse)
console.log(f(['we','rt4t','rer']))
