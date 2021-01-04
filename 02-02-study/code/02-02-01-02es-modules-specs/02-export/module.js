
/**
 * ESM每一个模块都会作用到独立的私有作用域当中
 * 模块内所有成员都没法在模块外被访问到
 */
// export var name = 'foo module'
// // 可以修饰函数
// export function hello() {}
// //可以修饰class
// export class Person{}

//还可以集中导出当前模块要暴露出的内容，这种方式更直观
var name = 'foo modul111e'
function hello() { }
class Person { }
// export {
//     name, hello, Person
// }


// 通过as关键词实现导出内容的重命名
// export {
//     name as fooName, hello, Person
// }

// 将导出成员重命名为default，那此成员就是当前模块的默认成员
// export {
//     name as default, hello, Person
// }

// export default name为当前模块的默认导出方式
export default name