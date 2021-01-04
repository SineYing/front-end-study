const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [{
      test:/.md$/,
      // use不止可以引入模块，还可以指向文件路径,这一点类似于require
      use:[
        'html-loader',
        './markdown-loader.js'
      ]
    }]
  }
}
