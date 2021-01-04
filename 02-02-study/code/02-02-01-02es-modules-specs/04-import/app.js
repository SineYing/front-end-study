/**
 * 1.from后面必须是完整的文件路径不能省略.js扩展名，这个跟commonJS是有区别的
 */
// import { name } from './module'
// import { name } from './module.js'
// console.log(name)

/**
 * 2.ESM 也不能默认加载文件夹下的index.js文件，可以通过打包插件自行配置使用
 */
// import { lowercase } from './utils'
// import { lowercase } from './utils/index.js'
// console.log(lowercase('HHH'))

/**
 * 3.在网页资源中的相对路径的./是可以省略掉的，但是ESM中./不能省略，
 * 因为省略后是以字母开头，默认以为是在加载第三方模块
 * 也可以使用以/开头的绝对路径来进行访问
 * 也可以使用完整的URL来访问我们的模块，可以直接引用CDN上的一些文件
 * 
 */
// import { name } from 'module.js'
// import { name } from './module.js'
// import { name } from '/04-import/module.js'
// import { name } from 'http://localhost:3000/04-import/module.js'
// console.log(name)

// --------------

/**
 * 4.如果只是执行摸个模块而不需要提取某个成员可以使用以下两种方式
 */
// import {} from './module.js'
// import './module.js'

// ---------------

/**
 * 5.如果导入的成员特别多，可以使用*来导入所有成员，然后放入mod中
 * 访问时直接使用mod.来访问即可
 */
// import * as mod from './module.js'
// console.log(mod)

// ---------------

/**
 * 6.import可以理解为导入模块的声明
 * 需要在开发阶段就要明确导入模块的路径
 * 不能使用import去from有个变量
 * import只能放到模块的顶层，不能放到各种语句当中
 * 动态导入模块
 */

//不能使用import去from有个变量
// var modulePath = './module.js'
// import { name } from modulePath
// console.log(name)

//import只能放到模块的顶层，不能放到各种语句当中
// if (true) {
//   import { name } from './module.js'
// }

//动态导入模块,可以通过then中的参数拿到导入的内容
// import('./module.js').then(function (module) {
//   console.log(module)
// })

// ----------------
/**
 * 7.如果一个模块中同时导出了命名成员和默认成员
 * 
 */
// import { name, age, default as title } from './module.js'
import abc, { name, age } from './module.js'
console.log(name, age, abc)
