// lodash 和 lodash/fp 模块中 map 方法的区别
// const _ = require('lodash')
// console.log(_.map(['12','11','34'],parseInt))
// //[ 12, NaN, NaN ]

// //parseInt('12',0,arr)
// //parseInt('11',1,arr)
// //parseInt('24',2,arr)

const fp = require('lodash/fp')
console.log(fp.map(parseInt,['12','11','34']))

//lodash和fp中接收的参数是不一样的



