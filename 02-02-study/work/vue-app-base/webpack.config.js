const HtmlWebpackPlugins = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { DefinePlugin } = require("webpack")
const { HotModuleReplacementPlugin } = require('webpack')
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devServer: {
      hot: true,
      open: true,
      // port: 1233,
      compress: true,
      inline:true,
      contentBase: path.join(__dirname, 'public'),
  },
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "eslint-loader",
        enforce: 'pre'
      },
      {
        test: [/\.less$/, /\.css$/],
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100 * 1024,
            esModule: false
          }
        }
      },
    ]
  },
  plugins: [
    new DefinePlugin({
      BASE_URL: JSON.stringify('./')
    }),
    new HtmlWebpackPlugins({
      title: 'vue app',
      template: path.join(__dirname, './public/index.html'),
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new HotModuleReplacementPlugin()
  ]
}
