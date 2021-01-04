const { HotModuleReplacementPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    target: 'web',
    devServer: {
        hot: true,
        open: true,
        compress: true,
        inline: true,
        contentBase: path.join(__dirname, 'public'),
    },
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        // new HotModuleReplacementPlugin()
    ]
})