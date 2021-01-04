const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.css',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module:{
    // 其他资源模块的加载规则配置
    rules:[
      // 需要配置两个属性
      {
        // 用来匹配打包的文件文件路径的正则表达式
        test:/.css$/,
        // 用来指定匹配的路径使用的loader
        use:[
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
