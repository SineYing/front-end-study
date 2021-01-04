const path = require('path')
console.log(path,__dirname)
// 这个文件是运行在nodejs环境的js文件，所以要按照commonJS的方式去编写代码
module.exports = {
  //入口文件,必须以./开头
  entry: './src/main.js',
  // 出口文件
  output: {
    // filename输出文件的名称
    filename: 'bundle.js',
    // path需要指定绝对路径
    path: path.join(__dirname, 'output')
  }
}