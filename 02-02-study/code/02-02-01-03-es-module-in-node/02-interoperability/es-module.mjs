//ES Module中可以导入CommonJS模块
import mod from './commonjs.js'
console.log(mod)

//不能直接提取成员，注意import不是结构导出对象
// import { foo } from './commonjs.js'
// console.log(foo)
//The requested module './commonjs.js' does not provide an export named 'foo'


export const foo = 'es module export value'