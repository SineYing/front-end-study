// 第一，将文件的扩展名由 .js 改为 .mjs；
// 第二，启动时需要额外添加 `--experimental-modules` 参数；

import { foo, bar } from './module.mjs'

console.log(foo, bar)

// esm 可以加载内置模块
// import fs from 'fs'
// fs.writeFileSync('./foo.txt','es modules works')


// 也可以直接提取模块内的成员，内置模块兼容了 ESM 的提取成员方式
import { writeFileSync } from 'fs'
writeFileSync('bar.txt', '来测试提取内置成员')


// 对于第三方的 NPM 模块也可以通过 esm 加载
// import _ from 'lodash'
// console.log(_.camelCase('ES MOdule'))

//不支持提取第三方模块内的成员，因为第三方模块都是导出默认成员
// import { camelCase } from 'lodash'
// console.log(camelCase('ES MOdule'))
