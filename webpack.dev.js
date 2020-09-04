const common = require('./webpack.common');
const { default: merge } = require('webpack-merge');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist/build',
        compress: true,
        port: 9000
      }
})