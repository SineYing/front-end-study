const HtmlWebpackPlugins = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const { DefinePlugin } = require("webpack")

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js|vue$/,
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

      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'a',
                  attribute: 'href',
                  type: 'src',
                },
              ],
            },
            minimize: true
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
    new VueLoaderPlugin()
  ]
}
