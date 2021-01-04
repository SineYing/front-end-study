/**
 *  CommonJS模块始终只会导出一个默认成员
 * 也就是说ESM只能使用import默认成员的方式导出
 * */ 
// module.exports = {
//     foo:'commonjs exports value'
// }
//与上面的表达内容是一致的
// exports.foo = 'commonjs exports value'

//不能在CommonJS模块中通过require载入ES Module
const mod = require('./es-module.mjs')
console.log(mod)