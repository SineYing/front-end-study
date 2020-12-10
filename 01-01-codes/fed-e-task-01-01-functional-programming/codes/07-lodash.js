//演示lodash
// first last toUpper reverse each 
// es6中新的属性includes find findIndex
const _ = require('lodash')
const array = ['jack', 'tom', 'lucy', 'kate']
console.log(_.first(array))
console.log(_.last(array))

console.log(_.toUpper(_.first(array)))

//数组的reverse没有参数，不是一个纯函数
console.log(array.reverse(), 'array.reverse')

console.log(_.reverse(array))

// each是forEach的别名
const r = _.each(array, (item, index) => {
    console.log(item, index)
})
console.log(r)

console.log(array.includes(1), 'array.includes(1)')
console.log(array.find(item => item.length > 3), 'array.find(1)')
console.log(array.findIndex(item => item.length > 3), 'array.findIndex(1)')