
// import { default as fooName } from './module.js'
import someName from './module.js'
/* 模块系统会自动的去请求module.js这个文件并且把内部暴露的name给提取出来
作为局部变量去使用
*/

// console.log(fooName)
console.log(someName)