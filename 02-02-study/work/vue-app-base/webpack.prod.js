const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'production',
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './public/*.ico'),
          to: __dirname + '/dist',
        },
      ],
      options: {}
    }),
  ]
})
